import React, { useState } from "react";

const BestieRegistrationModal = ({ isOpen, onClose, form }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    giftToWorld: "",
    location: "",
    remarks: "" // אפשרות להערות נוספות
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // לדוגמה: פשוט נפתח את טופס גוגל בחלונית חדשה
    window.open(
      "https://docs.google.com/forms/d/1l-xu6MEwPfmnvHUOydGB-R_HiiWCc5W2FMF9BR20ucw/edit",
      "_blank"
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{form.title}</h2>
        <p className="modal-description">{form.description}</p>

        <form onSubmit={handleSubmit} className="bestie-form">
          {form.fields.map((field) => (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  required={field.required}
                />
              )}
            </div>
          ))}

          {/* שדה נוסף להערות אם תרצי */}
          <div className="form-group">
            <label>הערות נוספות</label>
            <textarea
              placeholder="כל מה שתרצי לשתף..."
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="glossy-button">
              הצטרפות למשפחת בסטיז
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

export default BestieRegistrationModal;
