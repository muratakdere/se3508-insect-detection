from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from your_model import detect_balloon_in_frame  # Modeli import ediyoruz
import cv2
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Frontend'ten gelen isteklere izin ver

UPLOAD_FOLDER = "uploaded_videos"
PROCESSED_FOLDER = "processed_videos"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# Gerçek zamanlı frame analizi
@app.route('/analyze-frame', methods=['POST'])
def analyze_frame():
    # Frontend'ten gelen base64 verisini alıyoruz
    data = request.get_json()
    frame_data = data['frame']
    
    # Base64'ten binary veriye çeviriyoruz
    img_data = base64.b64decode(frame_data.split(',')[1])
    
    # Frame'i np.array formatına çeviriyoruz
    np_img = np.frombuffer(img_data, dtype=np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    
    # Modeli kullanarak balon tespiti yapıyoruz
    detected_frame = detect_balloon_in_frame(frame)

    # Tespit edilen frame'i tekrar base64 formatında geri gönderiyoruz
    _, buffer = cv2.imencode('.jpg', detected_frame)  # Sonuçları JPEG formatında kodluyoruz
    detected_frame_base64 = base64.b64encode(buffer).decode('utf-8')

    # Tespit edilen frame'i base64 formatında geri gönderiyoruz
    return jsonify({
        'frame': detected_frame_base64
    })

if __name__ == '__main__':
    app.run(debug=True)

