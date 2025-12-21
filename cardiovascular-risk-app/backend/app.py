from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from typing import Dict, List, Any
import io
import joblib
import os

app = Flask(__name__)
CORS(app)

# Load the trained model
MODEL_PATH = 'models/binary_logistic_regression_model.pkl'
try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Scaling parameters from training data
SCALING_PARAMS = {
    "Age": {"mean": 46.7808823529, "std": 11.9071927156},
    "Weight (kg)": {"mean": 85.9008636029, "std": 20.5439151171},
    "Height (m)": {"mean": 1.7525948529, "std": 0.1100074376},
    "BMI": {"mean": 28.2866911765, "std": 7.6925854763},
    "Abdominal Circumference (cm)": {"mean": 91.6889981787, "std": 12.7568242241},
    "Total Cholesterol (mg/dL)": {"mean": 204.1272058824, "std": 53.5577713662},
    "HDL (mg/dL)": {"mean": 55.3169117647, "std": 15.4404648614},
    "Fasting Blood Sugar (mg/dL)": {"mean": 117.1279411765, "std": 29.5767511346},
    "Height (cm)": {"mean": 175.2482838235, "std": 10.9055172937},
    "Waist-to-Height Ratio": {"mean": 0.5252965507, "std": 0.0806377141},
    "Systolic BP": {"mean": 126.5625, "std": 21.6647933899},
    "Diastolic BP": {"mean": 81.9066176471, "std": 13.9352845799},
    "Estimated LDL (mg/dL)": {"mean": 117.7169117647, "std": 53.0223689105},
    "BMI_calculated": {"mean": 28.2860684897, "std": 7.6928293109}
}

def calculate_bp_category(systolic, diastolic):
    if systolic < 120 and diastolic < 80:
        return 0  # Normal
    elif 120 <= systolic <= 129 and diastolic < 80:
        return 1  # Elevated
    elif (130 <= systolic <= 139) or (80 <= diastolic <= 89):
        return 2  # Hypertension Stage 1
    else:
        return 3  # Hypertension Stage 2

def predict_cardiovascular_risk(features: Dict[str, Any]) -> Dict[str, Any]:
    """
    Predict cardiovascular disease risk based on patient features
    """
    if model is None:
        return {"error": "Model not loaded"}

    try:
        # Extract and convert inputs
        age = float(features.get('age', 0))
        sex = 1 if features.get('sex', '').lower() == 'male' else 0
        weight = float(features.get('weight', 0))
        height_cm = float(features.get('height', 0))
        abdominal_circumference = float(features.get('abdominal_circumference', 0))
        total_cholesterol = float(features.get('total_cholesterol', 0))
        hdl = float(features.get('hdl', 0))
        fasting_blood_sugar = float(features.get('fasting_blood_sugar', 0))
        smoking = 1 if features.get('smoking', '').lower() == 'yes' else 0
        diabetes = 1 if features.get('diabetes', '').lower() == 'yes' else 0
        
        activity_map = {'low': 0, 'moderate': 1, 'high': 2}
        physical_activity = activity_map.get(features.get('physical_activity', '').lower(), 0)
        
        family_history = 1 if features.get('family_history', '').lower() == 'yes' else 0
        systolic = float(features.get('systolic', 0))
        diastolic = float(features.get('diastolic', 0))

        # Calculate derived features
        height_m = height_cm / 100
        bmi = weight / (height_m ** 2) if height_m > 0 else 0
        waist_to_height = abdominal_circumference / height_cm if height_cm > 0 else 0
        bp_category = calculate_bp_category(systolic, diastolic)
        estimated_ldl = total_cholesterol - hdl # Approximation as Non-HDL

        # Helper function to scale values
        def scale(value, param_name):
            params = SCALING_PARAMS.get(param_name)
            if params:
                return (value - params['mean']) / params['std']
            return value

        # Create DataFrame with exact columns expected by the model
        # Note: Numerical columns must be scaled because the model was trained on scaled data
        input_data = pd.DataFrame([{
            'Sex': sex,
            'Age': scale(age, 'Age'),
            'Weight (kg)': scale(weight, 'Weight (kg)'),
            'Height (m)': scale(height_m, 'Height (m)'),
            'BMI': scale(bmi, 'BMI'),
            'Abdominal Circumference (cm)': scale(abdominal_circumference, 'Abdominal Circumference (cm)'),
            'Total Cholesterol (mg/dL)': scale(total_cholesterol, 'Total Cholesterol (mg/dL)'),
            'HDL (mg/dL)': scale(hdl, 'HDL (mg/dL)'),
            'Fasting Blood Sugar (mg/dL)': scale(fasting_blood_sugar, 'Fasting Blood Sugar (mg/dL)'),
            'Smoking Status': smoking,
            'Diabetes Status': diabetes,
            'Physical Activity Level': physical_activity,
            'Family History of CVD': family_history,
            'Height (cm)': scale(height_cm, 'Height (cm)'),
            'Waist-to-Height Ratio': scale(waist_to_height, 'Waist-to-Height Ratio'),
            'Systolic BP': scale(systolic, 'Systolic BP'),
            'Diastolic BP': scale(diastolic, 'Diastolic BP'),
            'Blood Pressure Category': bp_category,
            'Estimated LDL (mg/dL)': scale(estimated_ldl, 'Estimated LDL (mg/dL)'),
            'BMI_calculated': scale(bmi, 'BMI_calculated')
        }])

        # Predict probability
        probability = model.predict_proba(input_data)[0][1]
        risk_score = round(probability * 100, 2)
        
        if probability >= 0.6:
            risk_level = "high"
        elif probability >= 0.3:
            risk_level = "medium"
        else:
            risk_level = "low"

        return {
            "riskScore": risk_score,
            "riskLevel": risk_level,
            "probability": probability
        }

    except Exception as e:
        print(f"Prediction error: {e}")
        return {"error": str(e)}


def generate_recommendations(features: Dict[str, Any], prediction: Dict[str, Any]) -> Dict[str, List[str]]:
    """Generate personalized health recommendations"""
    
    recommendations = {
        'diet': [],
        'lifestyle': [],
        'medical': []
    }
    
    # Diet recommendations
    total_cholesterol = float(features.get('total_cholesterol', 0))
    if total_cholesterol > 200:
        recommendations['diet'].append('Limit saturated fats and cholesterol-rich foods')
        recommendations['diet'].append('Increase fiber intake with whole grains and vegetables')
    
    fasting_blood_sugar = float(features.get('fasting_blood_sugar', 0))
    if fasting_blood_sugar > 100:
        recommendations['diet'].append('Reduce sugar and refined carbohydrate intake')
        recommendations['diet'].append('Choose low glycemic index foods')
    
    recommendations['diet'].append('Eat more fruits, vegetables, and lean proteins')
    recommendations['diet'].append('Reduce sodium intake to control blood pressure')
    
    # Lifestyle recommendations
    if features.get('smoking', '').lower() == 'yes':
        recommendations['lifestyle'].append('Quit smoking - this is the most important change you can make')
        recommendations['lifestyle'].append('Seek support through smoking cessation programs')
    
    if features.get('physical_activity', '').lower() == 'low':
        recommendations['lifestyle'].append('Start with 30 minutes of moderate exercise 5 days a week')
        recommendations['lifestyle'].append('Include both cardio and strength training activities')
    
    recommendations['lifestyle'].append('Manage stress through relaxation techniques')
    recommendations['lifestyle'].append('Ensure adequate sleep (7-9 hours per night)')
    
    # Medical recommendations
    risk_level = prediction.get('riskLevel')
    if risk_level == 'high':
        recommendations['medical'].append('Schedule an appointment with a cardiologist soon')
        recommendations['medical'].append('Discuss medication options with your healthcare provider')
    
    recommendations['medical'].append('Get regular cardiovascular health screenings')
    recommendations['medical'].append('Keep track of your blood pressure and cholesterol levels')
    
    return recommendations


def validate_patient_data(data: Dict[str, Any]) -> tuple[bool, str]:
    """Validate patient data"""
    
    required_fields = ['age', 'sex', 'height', 'weight', 'systolic', 'diastolic', 
                      'total_cholesterol', 'hdl', 'fasting_blood_sugar', 'smoking', 
                      'diabetes', 'physical_activity', 'family_history', 'abdominal_circumference']
    
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
            
        total_cholesterol = float(data['total_cholesterol'])
        if not 50 <= total_cholesterol <= 500:
            return False, "Total Cholesterol must be between 50 and 500 mg/dL"

        hdl = float(data['hdl'])
        if not 10 <= hdl <= 150:
            return False, "HDL must be between 10 and 150 mg/dL"
            
        fbs = float(data['fasting_blood_sugar'])
        if not 50 <= fbs <= 500:
            return False, "Fasting Blood Sugar must be between 50 and 500 mg/dL"
            
        abdominal_circumference = float(data['abdominal_circumference'])
        if not 40 <= abdominal_circumference <= 200:
            return False, "Abdominal Circumference must be between 40 and 200 cm"
        
    except (ValueError, TypeError):
        return False, "Invalid numeric value"
    
    # Validate categorical fields
    if data['sex'].lower() not in ['male', 'female']:
        return False, "Sex must be 'male' or 'female'"
    
    if data['smoking'].lower() not in ['yes', 'no']:
        return False, "Smoking must be 'yes' or 'no'"
    
    if data['diabetes'].lower() not in ['yes', 'no']:
        return False, "Diabetes must be 'yes' or 'no'"
        
    if data['family_history'].lower() not in ['yes', 'no']:
        return False, "Family History must be 'yes' or 'no'"
    
    if data['physical_activity'].lower() not in ['low', 'moderate', 'high']:
        return False, "Physical activity must be 'low', 'moderate', or 'high'"
    
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
            'riskLevel': prediction.get('riskLevel'),
            'probability': prediction.get('probability'),
            'riskScore': prediction.get('riskScore'),
            'recommendations': recommendations,
            'formData': data
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/predict-csv', methods=['POST'])
def predict_csv():
    """
    Predict cardiovascular risk for multiple patients from CSV
    
    Expects a CSV file with columns:
    age,sex,height,weight,systolic,diastolic,total_cholesterol,hdl,fasting_blood_sugar,smoking,diabetes,family_history,physical_activity,abdominal_circumference
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
        required_columns = ['age', 'sex', 'height', 'weight', 'systolic', 'diastolic', 
                          'total_cholesterol', 'hdl', 'fasting_blood_sugar', 'smoking', 
                          'diabetes', 'family_history', 'physical_activity', 'abdominal_circumference']
        
        # Normalize column names to lowercase and strip whitespace
        df.columns = df.columns.str.lower().str.strip()
        
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
            
            if "error" in prediction:
                 errors.append({
                    'row': idx + 1,
                    'error': prediction["error"]
                })
                 continue

            results.append({
                'patient_id': f'P{str(idx + 1).zfill(3)}',
                'age': int(patient_data['age']),
                'sex': patient_data['sex'],
                'risk_level': prediction['riskLevel'],
                'probability': prediction['probability'],
                'risk_score': prediction['riskScore']
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
