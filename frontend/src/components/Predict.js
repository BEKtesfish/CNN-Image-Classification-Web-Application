import React, { useState } from "react";
import axios from "axios";

const Predict = ({ acceptedFiles }) => {
  const [result, setResult] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState(null);
  
  

  const handlePrediction = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("API URL:", process.env.REACT_APP_FAST_API_URL); // Add this line

    try {
      const response = await axios.post('http://localhost:8000/predict', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
     
      setResult(response.data);
      setPrediction(response.data.prediction);
      setConfidence((100*response.data.confidence).toFixed(2) + " %");
    } catch (error) {
      console.error("Error:", error);
      
      setError("something went wrong during prediction");
    }
  };

  React.useEffect(() => {
    if (acceptedFiles.length > 0) {
      handlePrediction(acceptedFiles[0]);
    }
  }, [acceptedFiles]);
  return (
    <div>
      {error && <p>{error}</p>}
      {prediction !== null ? (
        <>
          <p>Prediction: {prediction}</p>
          <p>Confidence: {confidence}</p>
        </>
      ) : (
        <p>No prediction available yet.</p>
      )}
    </div>
  );
};
export default Predict;
