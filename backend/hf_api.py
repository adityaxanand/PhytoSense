# backend/hf_api.py
import requests
import re

def parse_prediction(text: str):
    """
    Parses the prediction text expected in the format:
    "Predicted: <class> (Confidence: <confidence>)"
    
    Returns:
        tuple: (predicted_class, confidence) if parsing is successful,
               otherwise returns (text, 1.0) as fallback.
    """
    pattern = r"Predicted:\s*(.*?)\s*\(Confidence:\s*([0-9.]+)\)"
    match = re.search(pattern, text)
    if match:
        predicted_class = match.group(1)
        confidence = float(match.group(2))
        return predicted_class, confidence
    else:
        # Fallback if the expected format is not matched
        return text, 1.0

def predict_disease(image_path):
    """
    Sends the image file to the Hugging Face Spaces inference API and parses its result.
    
    Args:
        image_path (str): Path to the image file.
    
    Returns:
        dict: A dictionary with a 'prediction' key that includes the class and confidence.
    """
    API_URL = "https://adityaanand-phytosense.hf.space/run/predict"
    
    with open(image_path, "rb") as f:
        # The Hugging Face API expects the file in a field; here we use 'data'
        files = {"data": f}
        response = requests.post(API_URL, files=files)
    
    if response.status_code != 200:
        raise Exception(f"Error: {response.status_code}, {response.text}")
    
    # Expected API response structure from Gradio:
    # {
    #   "data": ["Predicted: Tomato___healthy (Confidence: 0.97)"]
    # }
    result = response.json()
    
    if not isinstance(result, dict) or "data" not in result or not result["data"]:
        raise Exception("Unexpected API response format")
    
    # Extract the first output string from the 'data' array
    prediction_text = result["data"][0]
    
    predicted_class, confidence = parse_prediction(prediction_text)
    
    return {
        "prediction": {
            "class": predicted_class,
            "confidence": confidence
        }
    }
