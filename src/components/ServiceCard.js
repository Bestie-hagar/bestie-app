// src/components/ServiceCard.js
import React from "react";

const ServiceCard = ({ service, onSelect }) => {
  return (
    <div className="service-card" onClick={onSelect}>
      <div className="service-header">
        <h2>{service.title}</h2>
      </div>
      <p>{service.description}</p>
    </div>
  );
};

export default ServiceCard;

