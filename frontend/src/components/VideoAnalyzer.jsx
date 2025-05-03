import React, { useRef, useEffect } from 'react';

const VideoAnalyzer = ({ videoFile }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const isProcessing = useRef(false); // işlem kontrolü
  const lastFrameTime = useRef(0); // FPS kontrolü

  useEffect(() => {
    if (!videoFile) return;

    const videoElement = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const desiredFPS = 5;
    const interval = 1000 / desiredFPS;

    const processFrame = async (timestamp) => {
      requestAnimationFrame(processFrame);

      if (isProcessing.current) return;

      if (timestamp - lastFrameTime.current < interval) return;
      lastFrameTime.current = timestamp;
      isProcessing.current = true;

      try {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const frame = canvas.toDataURL('image/jpeg');

        const response = await fetch('http://localhost:5000/analyze-frame', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ frame })
        });

        const data = await response.json();

        const processedFrame = new Image();
        processedFrame.src = 'data:image/jpeg;base64,' + data.frame;

        processedFrame.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(processedFrame, 0, 0, canvas.width, canvas.height);
        };
      } catch (error) {
        console.error('Frame işlenirken hata:', error);
      } finally {
        isProcessing.current = false;
      }
    };

    videoElement.onloadeddata = () => {
      videoElement.play();
      requestAnimationFrame(processFrame);
    };
  }, [videoFile]);

  return (
    <div style={{ position: 'relative', width: '600px', height: '400px' }}>
      {/* Gizli video */}
      <video
        ref={videoRef}
        src={URL.createObjectURL(videoFile)}
        style={{ display: 'none' }}
      />
      {/* Kullanıcıya gösterilecek canvas */}
      <canvas
        ref={canvasRef}
        width="600"
        height="400"
       
      />
    </div>
  );
};

export default VideoAnalyzer;


