import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);

  const goToHome = () => {
    setIsFading(true);
  };

  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 1400); // CSS fade duration
      return () => clearTimeout(timer);
    }
  }, [isFading, navigate]);

  return (
    <div className="landing-page">
      <video className="background-video" autoPlay muted loop>
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={`landing-gradient-mask ${isFading ? 'fade-out-content' : ''}`} />
      <div className={`landing-hero-content ${isFading ? 'fade-out-content' : ''}`}>
        <h1>Welcome to BharatVerse</h1>
        <button onClick={goToHome} className="btn btn-primary get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
}
