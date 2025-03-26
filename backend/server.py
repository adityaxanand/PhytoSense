# backend/server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from hf_api import predict_disease
import os

app = Flask(__name__)
CORS(app)  # Enable CORS so that your frontend can access this endpoint

@app.route('/predict/', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    temp_file = "temp_image.jpg"
    file.save(temp_file)

    try:
        result = predict_disease(temp_file)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
