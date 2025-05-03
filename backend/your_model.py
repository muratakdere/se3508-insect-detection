import torch
from ultralytics import YOLO
import cv2
import os

model = YOLO("best.pt")  # backend klasöründeki modeli yüklüyoruz

# Video analizi: Tüm video üzerinde balon tespiti yapıyor
def analyze_video(video_path):
    cap = cv2.VideoCapture(video_path)
    width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps    = cap.get(cv2.CAP_PROP_FPS)

    output_path = os.path.join("processed_videos", os.path.basename(video_path))
    out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = model(rgb_frame)[0]
        annotated_frame = results.plot()

        out.write(annotated_frame)

    cap.release()
    out.release()
    return output_path


# Gerçek zamanlı frame analizi: Tek bir frame üzerinde balon tespiti yapıyor
def detect_balloon_in_frame(frame):
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = model(rgb_frame)[0]
    annotated_frame = results.plot()
    return annotated_frame



