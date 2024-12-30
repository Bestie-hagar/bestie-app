import React, { useState } from "react";

const ConsultationFormModal = ({ isOpen, onClose, form }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    painPoints: "",
    remarks: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send form data to the backend
    const response = await fetch('/api/sendTelegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address || "Not specified", // Include address if exists
        location: formData.location || "Not specified", // Include location if exists
        service: form.service || "Not specified", // Include service if exists
        notes: formData.remarks || "Not specified", // Include remarks
      }),
    });

    if (response.ok) {
      alert('Form submitted successfully!');
      onClose();
    } else {
      alert('Failed to submit the form.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{form.title}</h2>
        <form onSubmit={handleSubmit} className="consultation-form">
          {form.fields.map((field) => (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field.name]: e.target.value
                    })
                  }
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field.name]: e.target.value
                    })
                  }
                  required={field.required}
