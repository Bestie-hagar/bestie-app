// src/components/SplashScreen.js

import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
 const [isAnimating, setIsAnimating] = useState(true);
 
 useEffect(() => {
   setTimeout(() => {
     setIsAnimating(false);
     setTimeout(onComplete, 500);
   }, 3000);
 }, []);

 return (
   <div className={`splash-screen ${!isAnimating ? 'fade-out' : ''}`}>
     <div className="splash-cloud left"></div>
     <div className="splash-cloud right"></div>
     <div className="splash-content">
       <div className="logo">
         <img src="/logo.png" alt="Bestie Logo" />
       </div>
       <h1>I GOT YOU, BESTIE</h1>
       <p>שירות שלא ידעת שאת צריכה</p>
     </div>
   </div>
 );
};

export default SplashScreen;
