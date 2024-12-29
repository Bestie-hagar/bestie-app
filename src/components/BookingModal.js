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

    try {
      // Prepare orderDetails based on formData
      const orderDetails = {
        fullName: formData.fullName || "לא צויין",
        phone: formData.phone || "לא צויין",
        location: formData.location || "לא צויין",
        address: formData.address || "לא צויין",
        date: formData.date || "לא צויין",
        time: formData.time || "לא צויין",
        notes: formData.notes || "אין",
        service: service.title || "לא צויין" // Assuming service.title holds the selected service
      };

      const telegramSuccess = await sendTelegramNotification(orderDetails);

      if (!telegramSuccess) {
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
        <h2 className="modal-title">
          {service.icon} הזמנת {service.title}
        </h2>
        {isNewCustomer && (
          <div className="promo-banner">
            🎉 מבצע למצטרפים חדשים! {service.promoPrice}
          </div>
        )}

        <form onSubmit={handleSubmit} className="booking-form">
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
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>מיקום</label>
            <select
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            >
              <option value="">בחר מיקום</option>
              <option value="home">בבית</option>
              <option value="outside">בחוץ</option>
            </select>
          </div>
          <div className="form-group">
            <label>כתובת</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>תאריך</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>שעה</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>הערות</label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
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

export default BookingModal;
