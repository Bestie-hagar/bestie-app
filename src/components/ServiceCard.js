import React from "react";
import Pricing from "./Pricing"; // Import the Pricing component

const ServiceCard = ({ service, onSelect }) => {
  const handleClick = () => {
    if (typeof onSelect === "function") onSelect();
  };

  // מחשבים את המחיר אחרי ההנחה
  const originalPrice = service.investment; // Use the original investment value
  const discountedPrice = Math.round(originalPrice * 0.6); // Calculate discounted price

  return (
    <div className="service-card" onClick={handleClick}>
      {/* האימוג’י של השירות */}
      <div className="service-icon">{service.icon}</div>

      <div className="service-header">
        <h2>{service.title}</h2>
      </div>

      {service.subtitle && (
        <p className="service-subtitle">{service.subtitle}</p>
      )}

      <div className="service-details">
        <p>{service.description}</p>
        {service.duration && (
          <p className="service-duration">⏱ {service.duration}</p>
        )}
        {/* Use the Pricing component */}
        <Pricing originalPrice={originalPrice} discountedPrice={discountedPrice} />
        {service.extraInfo && <p className="service-extra">{service.extraInfo}</p>}
      </div>
    </div>
  );
};

export default ServiceCard;
