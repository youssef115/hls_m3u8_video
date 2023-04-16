import React, { useEffect, useRef } from "react";
import Hls from 'hls.js';

const App = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource('http://localhost:4000/');
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = 'http://localhost:4000/';
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
      });
    }
  }, []);

  return (
    
    <div>
      <h1>hello there</h1>
      <video ref={videoRef} controls></video>
    </div>
  );
};

export default App;
