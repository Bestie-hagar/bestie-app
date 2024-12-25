import React, { useState } from "react";

const ConsultationFormModal = ({ isOpen, onClose, form }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    painPoints: "",
    remarks: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // אפשר לפתוח טופס גוגל בפרה-פיל או לשלוח באימייל/טלגרם
    window.open("https://docs.google.com/forms/...", "_blank");
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
