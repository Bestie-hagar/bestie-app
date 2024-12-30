import React, { useState } from "react";
import { sendTelegramNotification } from "../services/telegramService"; // Import the function

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
    
    // Call the function to send Telegram notification
    const success = await sendTelegramNotification(formData);
    if (success) {
      console.log("Notification sent successfully");
    } else {
      console.error("Failed to send notification");
    }

    onClose();
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
