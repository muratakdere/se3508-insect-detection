import React from 'react';
import Navbar from '../components/Navbar';
import '../css/HomePage.css'; // Animasyonlar için CSS dosyasını import et

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="slogan-container">
          <h1 className="fade-in">Discover the Secrets of Insects</h1>
          <p className="fade-in">Your real-time insect monitoring and analysis system</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

