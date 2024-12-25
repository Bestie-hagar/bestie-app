import React, { useState, useEffect } from "react";

const SplashScreen = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // לאחר 3 שניות מורידים את האנימציה ואז מחכים עוד חצי שנייה לפני שמסתירים
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${!isAnimating ? "fade-out" : ""}`}>
      <div className="splash-cloud left"></div>
      <div className="splash-cloud right"></div>
      <div className="splash-content">
        <div className="logo">
          <img src="/besties-logo.png" alt="Besties Logo" />
        </div>
        <h1>I GOT YOU, BESTIE</h1>
        <p>שירות שלא ידעת שאת צריכה</p>
      </div>
    </div>
  );
};

export default SplashScreen;
