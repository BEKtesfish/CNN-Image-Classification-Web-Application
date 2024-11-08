from fastapi import FastAPI,UploadFile
import uvicorn
import numpy as np
from PIL import Image
from io import BytesIO
import tensorflow as tf



app = FastAPI()
MODEL = tf.keras.models.load_model("../kerasmode/model.keras")

CLASS_NAMES = ['Early blight', 'Late blight', 'healthy']

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
	predictions = MODEL.predict(image_batch)
	prediction_index = np.argmax(predictions[0])
	predictions_class_name = CLASS_NAMES[prediction_index]
	confidence = np.max(predictions[0])
	return {"prediction": predictions_class_name,
	"confidence" : float(confidence)}


if __name__ == "__main__":
	uvicorn.run(app, host = "localhost", port = 8000)