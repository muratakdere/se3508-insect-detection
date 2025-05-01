import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // 'Switch' yerine 'Routes' kullanıyoruz
import HomePage from './pages/HomePage';
import DetectPage from './pages/DetectPage';
import AboutPage from './pages/AboutPage';

const RouterConfig = () => {
  return (
    <Router>
      <Routes> {/* 'Switch' yerine 'Routes' kullanıyoruz */}
        <Route path="/" element={<HomePage />} /> {/* 'component' yerine 'element' kullanıyoruz */}
        <Route path="/detect" element={<DetectPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;

