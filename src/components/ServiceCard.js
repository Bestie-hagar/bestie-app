import React from "react";

const ServiceCard = ({ service, onSelect }) => {
  const handleClick = () => {
    if (typeof onSelect === "function") onSelect();
  };

  return (
    <div className="service-card" onClick={handleClick}>
      {/* אייקון האימוג׳י */}
      <div className="service-icon">{service.icon}</div>

      <div className="service-header">
        <h2>{service.title}</h2>
      </div>

      {/* כותרת משנה אם קיימת */}
      {service.subtitle && (
        <p className="service-subtitle">{service.subtitle}</p>
      )}

      {/* מחיר/עלות/פרטים */}
      <div className="service-details">
        <p>{service.description}</p>
        {service.duration && <p className="service-duration">⏱ {service.duration}</p>}
        <p className="service-investment">מחיר: {service.investment}</p>
        {service.extraInfo && <p className="service-extra">{service.extraInfo}</p>}
      </div>
    </div>
  );
};

export default ServiceCard;
