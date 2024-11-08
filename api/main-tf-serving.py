from fastapi import FastAPI,UploadFile
import uvicorn
import numpy as np
from PIL import Image
from io import BytesIO
import tensorflow as tf
import requests
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost:3000",  # React frontend
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
endpoint = "http://localhost:8501/v1/models/potatoes_model:predict"

CLASS_NAMES = ['Early blight', 'Late blight', 'Healthy']

@app.get("/ping")
async def ping():
	return "hello am alive."


def read_file_as_image(data) -> np.ndarray:
	image = np.array(Image.open(BytesIO(data)))
	return image


@app.post("/predict")
async def predict(
	file: UploadFile
):
	image = read_file_as_image(await file.read())
	image_batch = np.expand_dims(image, 0)
	json_data= {
		"instances": image_batch.tolist()
	}
	response = requests.post(endpoint, json = json_data)
	prediction = np.array(response.json()['predictions'][0])
	prediction_index = np.argmax(prediction)
	confidence = np.max(prediction)
	predicted_class = CLASS_NAMES[prediction_index]
	
	return {"prediction":predicted_class,
	"confidence" : float(confidence)}
	


if __name__ == "__main__":
	uvicorn.run(app, host = "localhost", port = 8000)