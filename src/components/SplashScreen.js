import React, { useState, useEffect } from "react";

const SplashScreen = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        onComplete();
      }, 600); // עוד חצי שנייה לתת לאנימציה להסתיים
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${!isAnimating ? "fade-out" : ""}`}>
      {/* עננים משני הצדדים, מאחורי הטקסט */}
      <div className="splash-cloud cloud-left"></div>
      <div className="splash-cloud cloud-right"></div>

      {/* התוכן (לוגו וכותרות) */}
      <div className="splash-content">
        <img src="/bestie-logo.png" alt="Bestie Logo" className="splash-logo" />
        <h1>I GOT YOU, BESTIE</h1>
        <p className="splash-subtitle">השירות שלא ידעת שאת צריכה</p>
      </div>
    </div>
  );
};

export default SplashScreen;
