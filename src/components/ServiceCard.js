import React from "react";

const ServiceCard = ({ service, onSelect }) => {
  const handleClick = () => {
    if (typeof onSelect === "function") onSelect();
  };

  // Convert the investment to a number for price calculation
  const investmentValue = parseFloat(service.investment.replace(/[^0-9.-]+/g,"")) || 0;
  const discountedPrice = Math.round(investmentValue * 0.6);

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
        {/* Displaying both the original price and the discounted price */}
        <p className="service-investment">
          <span className="original-price">{`${service.investment} ₪`}</span>{" "}
          <span className="discounted-price">{`${discountedPrice} ₪`}</span>
        </p>
        {service.extraInfo && <p className="service-extra">{service.extraInfo}</p>}
      </div>
    </div>
  );
};

export default ServiceCard;
