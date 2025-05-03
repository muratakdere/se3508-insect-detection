import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/DetectPage.css';
import VideoAnalyzer from '../components/VideoAnalyzer';

const DetectPage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!videoFile) return;
    setIsAnalyzing(true); // VideoAnalyzer bileşenini göster
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card">
          <h1>Insect Detection</h1>

          <label htmlFor="video-upload" className="file-input-label">
            Choose Video
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="file-input"
            onChange={(e) => {
              setVideoFile(e.target.files[0]);
              setIsAnalyzing(false); // Yeni video yüklendiğinde analiz sıfırlanır
            }}
          />

          {/* Sadece analiz başlamadan önce gösterilecek preview */}
          {videoFile && !isAnalyzing && (
            <div className="video-preview">
              <h3>Selected Video Preview</h3>
              <video src={URL.createObjectURL(videoFile)} controls width="600" />
            </div>
          )}

          {/* Analiz butonu */}
          <button
            onClick={handleAnalyze}
            className="upload-btn"
            disabled={!videoFile}
          >
            Analyze Video
          </button>

          {/* Gerçek zamanlı analiz */}
          {videoFile && isAnalyzing && <VideoAnalyzer videoFile={videoFile} />}
        </div>
      </div>
    </div>
  );
};

export default DetectPage;





