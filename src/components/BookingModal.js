
import React from "react";
import { sendTelegramNotification } from "../services/telegramService";

const BookingModal = ({
  isOpen,
  onClose,
  service,
  formData,
  setFormData,
  isNewCustomer,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      const notificationData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        location: formData.location,
        service: service.title,
        notes: formData.notes
      };

      console.log("Sending notification with data:", notificationData);
      const success = await sendTelegramNotification(notificationData);

      if (!success) {
        console.error("Failed to send Telegram notification");
        alert("שגיאה בשליחה לטלגרם. נסי שוב מאוחר יותר.");
        return;
      }

      alert("ההזמנה נשמרה בהצלחה! תודה שהזמנת מבסטי 🎉");
      onClose();
    } catch (error) {
      console.error("שגיאה בטיפול בטופס:", error);
      alert("שגיאה כללית. נסי שוב מאוחר יותר.");
    }
  };

  if (!isOpen || !service) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{service.title}</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>שם מלא</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>טלפון</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>אימייל</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>כתובת</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>מיקום הטיפול</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            >
              <option value="">בחרי מיקום</option>
              <option value="home">בבית</option>
              <option value="outside">בחוץ</option>
            </select>
          </div>
          <div className="form-group">
            <label>הערות</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">שליחה</button>
            <button type="button" onClick={onClose} className="cancel-button">ביטול</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
