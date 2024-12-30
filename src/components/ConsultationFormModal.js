import React, { useState } from "react";
import { sendTelegramNotification } from "../services/telegramService"; // Import your telegram service

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
    
    // Prepare order details to send
    const orderDetails = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address || "Not specified", // Include address if exists
      location: formData.location || "Not specified", // Include location if exists
      service: form.service || "Not specified", // Include service if exists
      notes: formData.remarks || "Not specified", // Include remarks
    };

    // Send order details to Telegram
    const success = await sendTelegramNotification(orderDetails);

    if (success) {
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
                />
              )}
            </div>
          ))}

          <div className="form-buttons">
            <button type="submit" className="glossy-button">
              שליחה
            </button>
            <button type="button" onClick={onClose} className="glossy-button">
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationFormModal;
