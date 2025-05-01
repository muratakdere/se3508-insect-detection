from flask import Flask, request, send_file
from flask_cors import CORS
from your_model import analyze_video
import os

app = Flask(__name__)
CORS(app)  # frontend'ten gelen isteklere izin ver

UPLOAD_FOLDER = "uploaded_videos"
PROCESSED_FOLDER = "processed_videos"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

@app.route('/analyze-video', methods=['POST'])
def analyze_video_api():
    video = request.files['video']
    input_path = os.path.join(UPLOAD_FOLDER, video.filename)
    video.save(input_path)

    output_path = analyze_video(input_path)
    return send_file(output_path, mimetype='video/mp4')

if __name__ == '__main__':
    app.run(debug=True)
