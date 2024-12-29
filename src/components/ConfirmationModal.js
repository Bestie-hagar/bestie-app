import React, { useState } from "react";
import { sendTelegramNotification } from "../services/telegramService";

const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    painPoints: "",
  });

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();

    try {
      const telegramMessage = `
✨ *ייעוץ חינם!*
👤 שם מלא: ${formData.fullName}
📱 טלפון: ${formData.phone}
📧 אימייל: ${formData.email}
💭 נקודות תקועות: ${formData.painPoints}
      `;

      const telegramSuccess = await sendTelegramNotification({
        text: telegramMessage,
      });

      if (!telegramSuccess) {
        alert("שגיאה בשליחה לטלגרם. נסי שוב מאוחר יותר.");
        return;
      }

      alert("הטופס נשלח בהצלחה! ניצור איתך קשר בקרוב.");
      onClose(); // סגירת המודל לאחר שליחה מוצלחת
    } catch (error) {
      console.error("שגיאה בטיפול בטופס:", error);
      alert("שגיאה כללית. נסי שוב מאוחר יותר.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">ייעוץ חינם</h2>
        <form onSubmit={handleConsultationSubmit}>
          <div className="form-group">
            <label>שם מלא</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>טלפון</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>אימייל</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>3 דברים שתקועים לי ואני חייבת לעשות</label>
            <textarea
              value={formData.painPoints}
              onChange={(e) =>
                setFormData({ ...formData, painPoints: e.target.value })
              }
              required
            />
          </div>
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

export default ConsultationModal;
