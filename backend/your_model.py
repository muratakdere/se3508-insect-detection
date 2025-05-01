import shutil
import os

def analyze_video(input_path):
    filename = os.path.basename(input_path)
    output_path = os.path.join("processed_videos", f"processed_{filename}")
    shutil.copy(input_path, output_path)
    return output_path
