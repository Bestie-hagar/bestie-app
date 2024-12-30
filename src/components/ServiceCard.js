import React from "react";

const ServiceCard = ({ service, onSelect }) => {
  const handleClick = () => {
    if (typeof onSelect === "function") onSelect();
  };

  // Safe parsing of the original price
  const originalPrice = parseFloat(service.investment.replace(/[^0-9.-]+/g, "")) || 0;
  const discountedPrice = originalPrice ? Math.round(originalPrice * 0.6) : null; // Calculate discounted price if original exists

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
        <p className="service-investment">
          {discountedPrice !== null && discountedPrice < originalPrice ? (
            <>
              <span className="original-price" style={{ textDecoration: 'line-through' }}>{originalPrice} ₪</span>{" "}
              <span className="discounted-price" style={{ color: 'red', fontWeight: 'bold' }}>{discountedPrice} ₪</span>
            </>
          ) : (
            <span className="original-price">{originalPrice} ₪</span>
          )}
        </p>
        {service.extraInfo && <p className="service-extra">{service.extraInfo}</p>}
      </div>
    </div>
  );
};

export default ServiceCard;
