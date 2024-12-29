import React from "react";

const ServiceCard = ({ service, onSelect }) => {
  const handleClick = () => {
    if (typeof onSelect === "function") onSelect();
  };

  // Calculate the discounted price as 60% of the original price
  const discountedPrice = Math.round(service.investment * 0.6);

  return (
    <div className="service-card" onClick={handleClick}>
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
          <span className="original-price">
            {service.investment > 0 ? `${service.investment} ₪` : "מחיר לא זמין"}
          </span>{" "}
          <span className="discounted-price">
            {discountedPrice > 0 ? `${discountedPrice} ₪` : "מחיר לא זמין"}
          </span>
        </p>
        {service.extraInfo && <p className="service-extra">{service.extraInfo}</p>}
      </div>
    </div>
  );
};

export default ServiceCard;
