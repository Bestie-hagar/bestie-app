import React, { useState, useEffect } from "react";

const SplashScreen = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 600); // חצי שנייה לסיום האנימציה
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${!isAnimating ? "fade-out" : ""}`}>
      {/* באנר המבצע */}
      <div className="banner">
        <p>🎉 מבצע השקה - עד 31.1.25! 🎉</p>
      </div>

      {/* עננים משני הצדדים */}
      <div className="splash-cloud cloud-left"></div>
      <div className="splash-cloud cloud-right"></div>

      {/* התוכן */}
      <div className="splash-content">
        <img src="/bestie-logo.png" alt="Bestie Logo" className="splash-logo" />
        <h1>I GOT YOU, BESTIE</h1>
        <p className="splash-subtitle">השירות שלא ידעת שאת צריכה</p>
      </div>
    </div>
  );
};

export default SplashScreen;
