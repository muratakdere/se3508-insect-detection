import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Navbar CSS dosyanız

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="left">
        Smart Insect Monitoring
      </div>
      <div className="right">
        <Link to="/">Home</Link>
        <Link to="/detect">Detect</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

export default Navbar;

