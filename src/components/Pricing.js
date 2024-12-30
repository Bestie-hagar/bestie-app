import React from "react";
import "./Pricing.css"; // Import the CSS file for styling

const Pricing = ({ originalPrice, discountedPrice }) => {
  return (
    <div className="pricing-container">
      <span className="original-price">{originalPrice} ₪</span>
      <span className="discounted-price">{discountedPrice} ₪</span>
    </div>
  );
};

export default Pricing;
