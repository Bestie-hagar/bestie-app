import React, { useState } from "react";
import { saveToGoogleSheet } from "../services/googleSheetsService";
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

    try {
      // שליחת התראה לטלגרם
      const telegramSuccess = await sendTelegramNotification({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        service: {
          title: "נרשמת כנותנת שירות לבסטי!"
        },
        notes: `כישרון: ${formData.giftToWorld}\nאיזור: ${formData.location}`,
        isPromo: false,
        address: "לא רלוונטי",
        location: "לא רלוונטי",
        date: "לא רלוונטי",
        time: "לא רלוונטי"
      });

      if (!telegramSuccess) {
        alert("שגיאה בשליחה לטלגרם. נסי שוב מאוחר יותר.");
        return;
      }

      // שמירת נתונים בגוגל שיטס
      const googleSheetsSuccess = await saveToGoogleSheet(formData, "בסטיז");
      if (!googleSheetsSuccess) {
        alert("שגיאה בשמירת הנתונים בגוגל שיטס. נסי שוב מאוחר יותר.");
        return;
      }

      alert("הפרטים נשמרו בהצלחה! תודה שהצטרפת למשפחת בסטיז 🎉");
      onClose(); // סגירת המודל
    } catch (error) {
      console.error("שגיאה בטיפול בטופס:", error);
      alert("שגיאה כללית. נסי שוב מאוחר יותר.");
    }
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
