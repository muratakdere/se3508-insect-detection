import React from 'react';
import Navbar from '../components/Navbar';
import '../App.css';

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="slogan-container">
          <h1>About Us</h1>
          <p>
            Smart Insect Monitoring is a real-time insect detection, classification,
            and risk assessment system powered by AI. This system helps in identifying
            and analyzing insects based on video input, allowing for quick and reliable
            monitoring of insect activity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
