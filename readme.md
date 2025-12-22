# Heart-ML: Cardiovascular Risk Prediction System

Heart-ML is a comprehensive machine learning application designed to predict the risk of cardiovascular disease (CVD) in patients. It combines a robust data science pipeline with a modern, user-friendly web interface to assist healthcare professionals and individuals in assessing heart health risks.

The system features a Next.js frontend for an intuitive user experience and a Flask backend that serves a trained Binary Logistic Regression model for real-time predictions.

## Features

### Real-time Risk Prediction

The core feature of the application allows users to input their health metrics and receive an instant risk assessment.

- **Input Form:** Collects 14 key health indicators including Age, BMI, Blood Pressure, Cholesterol levels, and lifestyle factors.
- **Instant Analysis:** The backend processes the data through the trained model and returns a risk probability score.
- **Risk Categorization:** Classifies the result into Low, Medium, or High risk categories with actionable insights.

### Hospital Dashboard

A dedicated interface for healthcare providers to manage and analyze patient data efficiently.

- **Bulk Data Upload:** Supports uploading CSV files containing multiple patient records for batch processing.
- **Risk Filtering:** Filter patients by risk level (High, Medium, Low) to prioritize care for high-risk individuals.
- **Data Visualization:** View patient demographics and risk distribution at a glance.

### Interactive Visualizations

The application includes dynamic charts and graphs to help users understand the data.

- **Risk Factors:** Visualizes how different factors like Age, BMI, and Blood Pressure contribute to the overall risk.
- **Distribution Charts:** Shows the distribution of risk across the uploaded patient population.

### Advanced ML Pipeline

The project is built on a rigorous data science foundation, documented in a series of Jupyter notebooks.

- **Data Cleaning:** Handling missing values, outlier detection, and correcting data types.
- **Exploratory Data Analysis (EDA):** In-depth analysis of feature distributions and correlations.
- **Feature Engineering:** Creation of derived features like BMI and Waist-to-Height Ratio to improve model performance.
- **Model Training:** Training and evaluation of the Binary Logistic Regression model.

### Responsive Design

- **Mobile-First:** Fully optimized for mobile devices, ensuring accessibility on tablets and smartphones.
- **Modern UI:** Built with Tailwind CSS and Radix UI for a clean, professional look.
- **Smooth Animations:** Uses Framer Motion for seamless page transitions and interactive elements.

## Machine Learning Model

The core of the application is a Binary Logistic Regression model trained to classify patients into risk categories.

### Model Architecture

- **Algorithm:** Binary Logistic Regression
- **Library:** Scikit-learn
- **Target Variable:** Cardiovascular Disease Risk (Binary: 0 = Low Risk, 1 = High Risk)
- **Model Choice:** Logistic Regression was chosen for its interpretability and efficiency as a baseline model for binary classification tasks in medical datasets.

### Feature Engineering

The model utilizes a set of 20 features, including both raw patient data and derived metrics to maximize predictive accuracy.

**Raw Input Features:**

- **Demographics:** Age, Sex
- **Vitals:** Weight, Height, Systolic BP, Diastolic BP
- **Lab Results:** Total Cholesterol, HDL Cholesterol, Fasting Blood Sugar
- **Lifestyle & History:** Smoking Status, Diabetes Status, Physical Activity Level, Family History of CVD, Abdominal Circumference

**Derived Features:**

- **BMI (Body Mass Index):** Calculated from weight and height.
- **Waist-to-Height Ratio:** A key indicator of central obesity.
- **Blood Pressure Category:** Categorical classification (Normal, Elevated, Hypertension Stage 1/2).
- **Estimated LDL:** Calculated using the Friedewald formula approximation (Total Cholesterol - HDL).

### Preprocessing Pipeline

1. **Data Cleaning:** Handling missing values and outlier detection.
2. **Categorical Encoding:** Mapping text inputs (e.g., "Male"/"Female", "Yes"/"No") to numerical binary values.
3. **Feature Scaling:** Standardization (Z-score normalization) is applied to continuous variables (Age, Weight, BP, etc.) using pre-calculated mean and standard deviation parameters from the training dataset.

## Tech Stack

### Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI & Lucide React
- **Animations:** Framer Motion
- **State Management:** React Hooks (useState, useEffect)

### Backend & Machine Learning

- **API:** Flask (Python)
- **ML Library:** Scikit-learn
- **Data Processing:** Pandas, NumPy
- **Model Serialization:** Joblib
- **Environment:** Python 3.9+

## Project Structure

```
Heart-ML/
├── Analysis/                 # Analysis reports and findings
├── Data/                     # Raw and processed datasets
│   ├── cleaned_data.csv      # Data after initial cleaning
│   ├── CVD Dataset.csv       # Original raw dataset
│   └── cvd_preprocessed_data.csv # Data ready for model training
├── Models/                   # Saved ML models
│   └── binary_logistic_regression_model.pkl # Trained model file
├── Notebooks/                # Data Science Pipeline
│   ├── 01_study&clean.ipynb  # Initial data study and cleaning
│   ├── 02_data_quality.ipynb # Quality assurance checks
│   ├── 03_EDA.ipynb          # Exploratory Data Analysis
│   ├── 04_preprocessing.ipynb# Feature engineering & scaling
│   └── 05_model_training.ipynb# Model training & evaluation
├── cardiovascular-risk-app/  # Frontend Application
│   ├── app/                  # Next.js App Router pages
│   │   ├── predict/          # Prediction form page
│   │   ├── hospital-dashboard/ # Dashboard for doctors
│   │   └── hospital-upload/  # Bulk upload page
│   ├── components/           # Reusable UI components
│   └── backend/              # Flask API Server
│       ├── app.py            # API Entry point
│       └── models/           # Model artifacts for inference
└── readme.md                 # Project Documentation
```

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)
- pnpm (or npm/yarn)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Heart-ML.git
cd Heart-ML
```

### 2. Backend Setup (Flask API)

Navigate to the backend directory and install dependencies.

```bash
cd cardiovascular-risk-app/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup (Next.js)

Open a new terminal, navigate to the app directory, and install dependencies.

```bash
cd cardiovascular-risk-app
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

The Flask backend provides the following endpoints:

- `GET /`: Returns API status and information.
- `GET /health`: Health check endpoint to verify server status.
- `POST /predict`: Accepts patient data (JSON) and returns the risk prediction.

**Example Request Body:**

```json
{
  "age": 55,
  "gender": "male",
  "height": 175,
  "weight": 82,
  "systolic": 140,
  "diastolic": 90,
  "cholesterol": 220,
  "hdl": 50,
  "glucose": 100,
  "smoking": "yes",
  "alcohol": "no",
  "physical_activity": "moderate"
}
```

## License

This project is licensed under the MIT License.
