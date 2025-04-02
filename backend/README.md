---
title: Phytosense
emoji: 👀
colorFrom: indigo
colorTo: blue
sdk: gradio
sdk_version: 5.23.1
app_file: app.py
pinned: false
license: mit
short_description: AI based Plant Detection System
inference: true
---

Check out the configuration reference at https://huggingface.co/docs/hub/spaces-config-reference


# Plant Disease Detection API

This project hosts a PyTorch model for plant disease detection on Hugging Face Spaces.

## Directory Structure

plant-disease-detection/ ├── backend/ │ ├── app.py │ ├── model.py │ ├── requirements.txt │ └── plantDiseaseDetection.pth └── README.md


## Running Locally

1. **Clone the Repository:**

   ```bash
   git clone https://huggingface.co/spaces/your-username/plant-disease-detection
   cd plant-disease-detection/backend

2. **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    
3. **Run the Application:**

    ```bash
    python app.py
    ```
    This will launch the Gradio interface locally. Open the provided URL in your browser, upload an image, and see the prediction.