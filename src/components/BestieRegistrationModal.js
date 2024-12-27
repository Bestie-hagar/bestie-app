import { saveToGoogleSheet } from "../services/googleSheetsService";
import React, { useState } from "react";
// נניח שאת רוצה להשתמש ב-telegramService שקיים
import { sendTelegramNotification } from "../services/telegramService";

const BestieRegistrationModal = ({ isOpen, onClose, form }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    giftToWorld: "",
    location: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) שליחת התראה לטלגרם
    const telegramSuccess = await sendTelegramNotification({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      // נמיר את "giftToWorld" ל-service.title, או נשים פשוט property חדש
      service: {
        title: "נרשמת כנותנת שירות לבסטי!"
      },
      notes: `כישרון: ${formData.giftToWorld}\nאיזור: ${formData.location}`,
      isPromo: false, // או true, לא באמת משנה כאן
      address: "לא רלוונטי", 
      location: "לא רלוונטי",
      date: "לא רלוונטי",
      time: "לא רלוונטי"
    });

    if (!telegramSuccess) {
      alert("התרחשה בעיה בשליחה לטלגרם. אנא נסי שוב מאוחר יותר.");
      return;
    }

    // 2) אפשרות להפניה לטופס גוגל (אם תרצי להשאיר את ה-flow הזה)
    window.open("https://docs.google.com/forms/d/...", "_blank");

    // 3) סגירת המודל
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{form.title}</h2>
        <p style={{ whiteSpace: "pre-line" }}>{form.description}</p>
        <form onSubmit={handleSubmit} className="bestie-form">
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
