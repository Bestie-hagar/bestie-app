import React from "react";
import { saveToGoogleSheet } from "../services/googleSheetsService";
import { sendTelegramNotification } from "../services/telegramService";

const BookingModal = ({
  isOpen,
  onClose,
  service,
  formData,
  setFormData,
  isNewCustomer
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // שליחת התראה לטלגרם
      const telegramSuccess = await sendTelegramNotification({
        fullName: formData.fullName,
        phone: formData.phone,
        service: service,
        notes: formData.notes || "אין הערות",
        isPromo: isNewCustomer,
        location: formData.location,
        address: formData.address,
        date: formData.date,
        time: formData.time
      });

      if (!telegramSuccess) {
        alert("שגיאה בשליחה לטלגרם. נסי שוב מאוחר יותר.");
        return;
      }

      // שמירת נתונים בגוגל שיטס
      const googleSheetsSuccess = await saveToGoogleSheet(
        {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email || "לא נמסר",
          service: service.title,
          notes: formData.notes
        },
        "חברות"
      );

      if (!googleSheetsSuccess) {
        alert("שגיאה בשמירת הנתונים בגוגל שיטס. נסי שוב מאוחר יותר.");
        return;
      }

      alert("ההזמנה נשמרה בהצלחה! תודה שהזמנת מבסטי 🎉");
      onClose(); // סגירת המודל
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

        <div className="service-details">
          {service.description && <p>{service.description}</p>}
          {service.investment && <p>מחיר: {service.investment}</p>}
          {service.extraInfo && <p>{service.extraInfo}</p>}
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          {/* טופס המילוי */}
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
