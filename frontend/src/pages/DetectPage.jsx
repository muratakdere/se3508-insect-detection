import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/DetectPage.css';

const DetectPage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [resultURL, setResultURL] = useState(null);

  const handleUpload = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append('video', videoFile);

    const res = await fetch('http://localhost:5000/analyze-video', {
      method: 'POST',
      body: formData,
    });

    const blob = await res.blob();
    const videoURL = URL.createObjectURL(blob);
    setResultURL(videoURL);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card">
          <h1>Insect Detection</h1>
          
          {/* Video dosyasını seçince önizleme göster */}
          <label htmlFor="video-upload" className="file-input-label">
            Choose Video
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="file-input"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />

          {/* Seçilen video dosyasının önizlemesi */}
          {videoFile && (
            <div className="video-preview">
              <h3>Selected Video Preview</h3>
              <video src={URL.createObjectURL(videoFile)} controls />
            </div>
          )}

          {/* Analiz butonu */}
          <button
            onClick={handleUpload}
            className="upload-btn"
            disabled={!videoFile}
          >
            Analyze Video
          </button>

          {/* Sonuç videosu */}
          {resultURL && (
            <div className="video-container">
              <h2>Analysis Result</h2>
              <video src={resultURL} controls />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectPage;


