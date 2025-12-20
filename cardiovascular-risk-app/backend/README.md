# CardioPredict Backend API

Flask-based backend API for cardiovascular disease risk prediction.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### GET /
Returns API information and available endpoints.

### GET /health
Health check endpoint.

### POST /predict
Predict cardiovascular risk for a single patient.

**Request Body:**
```json
{
  "age": 55,
  "gender": "male",
  "height": 175,
  "weight": 82,
  "systolic": 140,
  "diastolic": 90,
  "cholesterol": "above_normal",
  "glucose": "normal",
  "smoking": "yes",
  "alcohol": "no",
  "physical_activity": "no"
}
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "risk_level": "high",
    "probability": 0.78,
    "risk_score": 78
  },
  "recommendations": {
    "diet": [...],
    "lifestyle": [...],
    "medical": [...]
  }
}
```

### POST /predict-csv
Predict cardiovascular risk for multiple patients from CSV file.

**Request:**
- Content-Type: multipart/form-data
- Field: file (CSV file)

**CSV Format:**
```csv
age,gender,height,weight,systolic,diastolic,cholesterol,glucose,smoking,alcohol,physical_activity
55,male,175,82,140,90,above_normal,normal,yes,no,no
42,female,165,68,120,80,normal,normal,no,no,yes
```

**Response:**
```json
{
  "success": true,
  "total_patients": 2,
  "processed": 2,
  "errors": 0,
  "results": [
    {
      "patient_id": "P001",
      "age": 55,
      "gender": "male",
      "risk_level": "high",
      "probability": 0.78
    },
    ...
  ],
  "validation_errors": []
}
```

## Integrating ML Model

The current implementation uses a simple rule-based scoring system. To integrate a real ML model:

1. Train your model using scikit-learn, TensorFlow, or PyTorch
2. Save the trained model (e.g., using pickle or joblib)
3. Load the model in `app.py`:
```python
import joblib
model = joblib.load('cardio_model.pkl')
```

4. Replace the `predict_cardiovascular_risk` function to use your model:
```python
def predict_cardiovascular_risk(features: Dict[str, Any]) -> Dict[str, Any]:
    # Preprocess features
    X = preprocess_features(features)
    
    # Make prediction
    probability = model.predict_proba(X)[0][1]
    
    # Determine risk level
    if probability >= 0.6:
        risk_level = 'high'
    elif probability >= 0.3:
        risk_level = 'medium'
    else:
        risk_level = 'low'
    
    return {
        'risk_level': risk_level,
        'probability': round(probability, 2)
    }
```

## Connecting Frontend

To connect the Next.js frontend to this backend:

1. Update the API calls in the frontend to use `http://localhost:5000`
2. For production, deploy the Flask API to a server and update the API URL
3. Ensure CORS is properly configured for your frontend domain
