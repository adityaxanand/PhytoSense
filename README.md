# PhytoSense: Crop Disease Detection System

## Overview

PhytoSense is an innovative deep learning-based system designed to assist farmers, agricultural researchers, and enthusiasts in the early and accurate detection of crop diseases. Leveraging advanced neural networks, PhytoSense analyzes plant images to identify various pathological conditions, providing timely insights that can help mitigate crop loss and promote healthier agricultural practices.

The project encompasses a full-stack application, integrating a robust machine learning backend with an intuitive web-based frontend, making sophisticated disease detection accessible to a wide audience.

## Features

- **Deep Learning-Powered Disease Detection:** Utilizes a trained PyTorch neural network to accurately classify and identify common crop diseases from visual inputs.
- **Interactive Web Application:** Provides a user-friendly interface for uploading plant images and receiving instant disease diagnoses, with a clear separation of frontend and backend components.
- **Comprehensive Model Documentation:** Detailed insights into the neural network architecture, training methodology, and performance metrics are provided in a dedicated model PDF.
- **Data-Driven Insights:** Built upon a meticulously documented dataset, ensuring transparency and reproducibility of the model's performance.
- **Scalable Architecture:** Designed with modular components (backend, frontend, ML model) for ease of maintenance, updates, and potential future expansion.

## Technical Stack

The PhytoSense project is built using a modern and robust technical stack:

- **Core Language:** Python
- **Deep Learning Framework:** PyTorch (for model development, training, and inference)
- **Backend Web Framework:** Flask, FastAPI, or Django (for building RESTful APIs and serving the ML model)
- **Frontend Technologies:** HTML, CSS, JavaScript (likely with a modern framework like React, Vue.js, or Angular for dynamic UI)
- **Development Tools:** Jupyter Notebook (for experimentation and prototyping), Git/GitHub (for version control and collaboration)

## Project Structure

```
PhytoSense/
├── backend/                  # Server-side application logic and API endpoints
├── frontend/                 # Client-side user interface and assets
├── PhytoSense.ipynb          # Jupyter Notebook for ML model development, training, and evaluation
├── phyto_sense.py            # Core Python script containing the deep learning model's logic
├── phytoSense.pth            # Trained PyTorch model weights and architecture
├── PhytoSenseModelPDF.pdf    # Detailed documentation of the deep learning model
├── datasetInfo.txt           # Information about the dataset used for training
├── app.py                    # Main entry point for the backend web application
└── README.md                 # Project overview and documentation
```

## Workflow Overview

1. **Data Preparation:** The `datasetInfo.txt` file outlines the specifics of the crop disease image dataset, including its source, structure, and any preprocessing steps.
2. **Model Development & Training:** `PhytoSense.ipynb` serves as the interactive environment where the deep learning neural network is designed, trained on the crop disease dataset, and evaluated.
3. **Core Model Logic:** The refined and production-ready architecture and inference functions of the crop disease detection model are encapsulated in `phyto_sense.py`.
4. **Model Persistence:** The trained weights and architecture of the PyTorch model are saved as `phytoSense.pth`, ready for deployment and inference without retraining.
5. **Model Documentation:** `PhytoSenseModelPDF.pdf` provides a comprehensive technical deep dive into the model's design, training methodology, and performance analysis.
6. **Backend Application:** The `backend/` directory, with `app.py` as its main entry point, handles API requests from the frontend, loads the `phytoSense.pth` model, and performs disease inference.
7. **Frontend Application:** The `frontend/` directory contains the user interface, allowing users to upload plant images and visualize the disease detection results.
8. **End-to-End System Workflow:** Users interact with the frontend, which sends image data to the backend via API calls. The backend utilizes the `phytoSense.pth` model (via `phyto_sense.py`) to detect diseases and returns the results to the frontend for display.

## Setup and Installation

To set up the PhytoSense project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/adityaxanand/PhytoSense.git
    cd PhytoSense
    ```
2. **Set up Python environment:**
    ```bash
    python -m venv venv
    # On Unix or MacOS
    source venv/bin/activate
    # On Windows
    venv\Scripts\activate
    pip install -r requirements.txt
    ```
3. **Install PyTorch:** Follow the instructions on the [official PyTorch website](https://pytorch.org/get-started/locally/) for your specific system configuration.
4. **Backend Setup:** Navigate to the `backend/` directory and install any specific dependencies. Run the `app.py` file to start the backend server.
5. **Frontend Setup:** Navigate to the `frontend/` directory and install necessary Node.js packages (if a JS framework is used). Build and serve the frontend application.

<!-- *(Detailed instructions for `requirements.txt` and specific backend/frontend framework setup would be provided here.)* -->

## Usage

Once the application is running:

1. Access the frontend application through your web browser (typically `http://localhost:3000` or similar).
2. Upload an image of a plant leaf or a specific crop area.
3. The system will process the image and display the detected disease (if any) along with relevant information.

## Interactive Demo

Experience the PhytoSense model in action through its interactive online demonstration:  
[https://online.fliphtml5.com/rqfhm/vngn/](https://online.fliphtml5.com/rqfhm/vngn/)

## Model Documentation

Get the model PDF here:  
[https://drive.google.com/file/d/1eUre1ZqzxZXrORAjyDwQk_IWcss0SRxy/view?usp=sharing](https://drive.google.com/file/d/1eUre1ZqzxZXrORAjyDwQk_IWcss0SRxy/view?usp=sharing)

## Contributing

We welcome contributions to the PhytoSense project! Please refer to our `CONTRIBUTING.md` (if available) for guidelines on how to submit issues, pull requests, and contribute to the development.

## License

This project is open-source and available under the MIT License.

---

<!--
For embedding the interactive demo in a web page, you can use the following HTML snippet:

<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;">
  <iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/rqfhm/vngn/" seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"></iframe>
</div>
-->