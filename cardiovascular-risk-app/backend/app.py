from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from typing import Dict, List, Any
import io

app = Flask(__name__)
CORS(app)

# Mock ML model prediction function
# In production, replace with actual trained model
def predict_cardiovascular_risk(features: Dict[str, Any]) -> Dict[str, Any]:
    """
    Predict cardiovascular disease risk based on patient features
    
    Features:
    - age: int
    - gender: str ('male' or 'female')
    - height: float (cm)
    - weight: float (kg)
    - systolic: int (mmHg)
    - diastolic: int (mmHg)
    - cholesterol: str ('normal', 'above_normal', 'well_above_normal')
    - glucose: str ('normal', 'above_normal', 'well_above_normal')
    - smoking: str ('yes' or 'no')
    - alcohol: str ('yes' or 'no')
    - physical_activity: str ('yes' or 'no')
    """
    
    # Simple risk scoring algorithm (replace with actual ML model)
    risk_score = 0
    
    # Age factor
    age = int(features.get('age', 0))
    if age > 60:
        risk_score += 30
    elif age > 50:
        risk_score += 20
    elif age > 40:
        risk_score += 10
    
    # BMI factor
    height_m = float(features.get('height', 170)) / 100
    weight = float(features.get('weight', 70))
    bmi = weight / (height_m ** 2)
    if bmi > 30:
        risk_score += 20
    elif bmi > 25:
        risk_score += 10
    
    # Blood pressure factor
    systolic = int(features.get('systolic', 120))
    diastolic = int(features.get('diastolic', 80))
    if systolic > 140 or diastolic > 90:
        risk_score += 25
    elif systolic > 130 or diastolic > 85:
        risk_score += 15
    
    # Cholesterol factor
    cholesterol = features.get('cholesterol', 'normal')
    if cholesterol == 'well_above_normal':
        risk_score += 20
    elif cholesterol == 'above_normal':
        risk_score += 10
    
    # Glucose factor
    glucose = features.get('glucose', 'normal')
    if glucose == 'well_above_normal':
        risk_score += 20
    elif glucose == 'above_normal':
        risk_score += 10
    
    # Lifestyle factors
    if features.get('smoking') == 'yes':
        risk_score += 25
    if features.get('alcohol') == 'yes':
        risk_score += 10
    if features.get('physical_activity') == 'no':
        risk_score += 15
    
    # Gender factor (males generally have higher risk)
    if features.get('gender') == 'male':
        risk_score += 5
    
    # Convert to probability (0-1 scale)
    probability = min(risk_score / 100, 0.95)
    
    # Determine risk level
    if probability >= 0.6:
        risk_level = 'high'
    elif probability >= 0.3:
        risk_level = 'medium'
    else:
        risk_level = 'low'
    
    return {
        'risk_level': risk_level,
        'probability': round(probability, 2),
        'risk_score': risk_score
    }


def generate_recommendations(features: Dict[str, Any], prediction: Dict[str, Any]) -> Dict[str, List[str]]:
    """Generate personalized health recommendations"""
    
    recommendations = {
        'diet': [],
        'lifestyle': [],
        'medical': []
    }
    
    # Diet recommendations
    if features.get('cholesterol') in ['above_normal', 'well_above_normal']:
        recommendations['diet'].append('Limit saturated fats and cholesterol-rich foods')
        recommendations['diet'].append('Increase fiber intake with whole grains and vegetables')
    
    if features.get('glucose') in ['above_normal', 'well_above_normal']:
        recommendations['diet'].append('Reduce sugar and refined carbohydrate intake')
        recommendations['diet'].append('Choose low glycemic index foods')
    
    recommendations['diet'].append('Eat more fruits, vegetables, and lean proteins')
    recommendations['diet'].append('Reduce sodium intake to control blood pressure')
    
    # Lifestyle recommendations
    if features.get('smoking') == 'yes':
        recommendations['lifestyle'].append('Quit smoking - this is the most important change you can make')
        recommendations['lifestyle'].append('Seek support through smoking cessation programs')
    
    if features.get('physical_activity') == 'no':
        recommendations['lifestyle'].append('Start with 30 minutes of moderate exercise 5 days a week')
        recommendations['lifestyle'].append('Include both cardio and strength training activities')
    
    if features.get('alcohol') == 'yes':
        recommendations['lifestyle'].append('Limit alcohol consumption to moderate levels')
    
    recommendations['lifestyle'].append('Manage stress through relaxation techniques')
    recommendations['lifestyle'].append('Ensure adequate sleep (7-9 hours per night)')
    
    # Medical recommendations
    risk_level = prediction.get('risk_level')
    if risk_level == 'high':
        recommendations['medical'].append('Schedule an appointment with a cardiologist soon')
        recommendations['medical'].append('Discuss medication options with your healthcare provider')
    elif risk_level == 'medium':
        recommendations['medical'].append('Consult with your primary care physician')
        recommendations['medical'].append('Consider more frequent health check-ups')
    
    recommendations['medical'].append('Get regular cardiovascular health screenings')
    recommendations['medical'].append('Keep track of your blood pressure and cholesterol levels')
    
    return recommendations


def validate_patient_data(data: Dict[str, Any]) -> tuple[bool, str]:
    """Validate patient data"""
    
    required_fields = ['age', 'gender', 'height', 'weight', 'systolic', 'diastolic', 
                      'cholesterol', 'glucose', 'smoking', 'alcohol', 'physical_activity']
    
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    
    # Validate ranges
    try:
        age = int(data['age'])
        if not 1 <= age <= 120:
            return False, "Age must be between 1 and 120"
        
        height = float(data['height'])
        if not 50 <= height <= 250:
            return False, "Height must be between 50 and 250 cm"
        
        weight = float(data['weight'])
        if not 20 <= weight <= 300:
            return False, "Weight must be between 20 and 300 kg"
        
        systolic = int(data['systolic'])
        if not 70 <= systolic <= 250:
            return False, "Systolic BP must be between 70 and 250 mmHg"
        
        diastolic = int(data['diastolic'])
        if not 40 <= diastolic <= 150:
            return False, "Diastolic BP must be between 40 and 150 mmHg"
        
    except (ValueError, TypeError):
        return False, "Invalid numeric value"
    
    # Validate categorical fields
    if data['gender'] not in ['male', 'female']:
        return False, "Gender must be 'male' or 'female'"
    
    if data['cholesterol'] not in ['normal', 'above_normal', 'well_above_normal']:
        return False, "Invalid cholesterol level"
    
    if data['glucose'] not in ['normal', 'above_normal', 'well_above_normal']:
        return False, "Invalid glucose level"
    
    if data['smoking'] not in ['yes', 'no']:
        return False, "Smoking must be 'yes' or 'no'"
    
    if data['alcohol'] not in ['yes', 'no']:
        return False, "Alcohol must be 'yes' or 'no'"
    
    if data['physical_activity'] not in ['yes', 'no']:
        return False, "Physical activity must be 'yes' or 'no'"
    
    return True, ""


@app.route('/')
def home():
    return jsonify({
        'message': 'CardioPredict API',
        'version': '1.0.0',
        'endpoints': {
            '/predict': 'POST - Single patient prediction',
            '/predict-csv': 'POST - Bulk CSV prediction',
            '/health': 'GET - Health check'
        }
    })


@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})


@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict cardiovascular risk for a single patient
    
    Request body:
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
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Validate data
        is_valid, error_message = validate_patient_data(data)
        if not is_valid:
            return jsonify({'error': error_message}), 400
        
        # Make prediction
        prediction = predict_cardiovascular_risk(data)
        
        # Generate recommendations
        recommendations = generate_recommendations(data, prediction)
        
        return jsonify({
            'success': True,
            'prediction': prediction,
            'recommendations': recommendations
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/predict-csv', methods=['POST'])
def predict_csv():
    """
    Predict cardiovascular risk for multiple patients from CSV
    
    Expects a CSV file with columns:
    age,gender,height,weight,systolic,diastolic,cholesterol,glucose,smoking,alcohol,physical_activity
    """
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'File must be a CSV'}), 400
        
        # Read CSV
        csv_data = file.read().decode('utf-8')
        df = pd.read_csv(io.StringIO(csv_data))
        
        # Validate columns
        required_columns = ['age', 'gender', 'height', 'weight', 'systolic', 'diastolic',
                          'cholesterol', 'glucose', 'smoking', 'alcohol', 'physical_activity']
        
        missing_columns = set(required_columns) - set(df.columns)
        if missing_columns:
            return jsonify({'error': f'Missing columns: {", ".join(missing_columns)}'}), 400
        
        results = []
        errors = []
        
        for idx, row in df.iterrows():
            patient_data = row.to_dict()
            
            # Validate each patient
            is_valid, error_message = validate_patient_data(patient_data)
            if not is_valid:
                errors.append({
                    'row': idx + 1,
                    'error': error_message
                })
                continue
            
            # Make prediction
            prediction = predict_cardiovascular_risk(patient_data)
            
            results.append({
                'patient_id': f'P{str(idx + 1).zfill(3)}',
                'age': int(patient_data['age']),
                'gender': patient_data['gender'],
                'risk_level': prediction['risk_level'],
                'probability': prediction['probability']
            })
        
        return jsonify({
            'success': True,
            'total_patients': len(df),
            'processed': len(results),
            'errors': len(errors),
            'results': results,
            'validation_errors': errors
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
