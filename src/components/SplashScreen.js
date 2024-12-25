import React, { useState, useEffect } from "react";

const SplashScreen = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 600); // עוד חצי שנייה לתת לאנימציית ה-fade-out לקרות
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${!isAnimating ? "fade-out" : ""}`}>
      <div className="splash-cloud left"></div>
      <div className="splash-cloud right"></div>
      <div className="splash-cloud center"></div>

      <div className="splash-content">
        <img
          src="/bestie-logo.png"
          alt="Bestie Logo"
          className="splash-logo"
        />
        <h1>I GOT YOU, BESTIE</h1>
        <p className="splash-subtitle">שירות שלא ידעת שאת צריכה</p>
      </div>
    </div>
  );
};

export default SplashScreen;
