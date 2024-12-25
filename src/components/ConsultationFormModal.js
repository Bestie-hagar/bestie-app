import React, { useState } from "react";

const ConsultationFormModal = ({ isOpen, onClose, form }) => {
  // ערכי הטופס
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    painPoints: "",
    location: "",
    remarks: ""
  });

  // קישור פרה-פיל לטופס
  // (זהה את מזהי השדות מהקישור ששלחת)
  const googleFormBaseUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSddksPOJKRJhqeRbXEmJ_edqa6pAx-NQHKQCJk1CKvRxYFlMQ/viewform?usp=pp_url";

  // שליחה עם מילוי אוטומטי
  const handleSubmit = (e) => {
    e.preventDefault();

    // בכל שורה החליפי את entry.xxxxxxxx במזהה השדה המתאים שלך (מתוך הלינק הפרה-פילד):
    const prefillUrl =
      googleFormBaseUrl +
      `&entry.1441106907=${encodeURIComponent(formData.fullName)}` +   // שם מלא
      `&entry.528374973=${encodeURIComponent(formData.phone)}` +       // טלפון
      `&entry.1694789251=${encodeURIComponent(formData.email)}` +      // אימייל
      `&entry.631567530=${encodeURIComponent(formData.painPoints)}` +  // "מה תרצי להשיג / מה כואב"
      `&entry.886993262=${encodeURIComponent(formData.location)}` +    // מיקום
      `&entry.847821935=${encodeURIComponent(formData.remarks)}`;      // הערות נוספות

    // פותח את הקישור עם השדות המלאים
    window.open(prefillUrl, "_blank");

    // סגירה
    onClose();
  };

  // אם המודל לא פתוח, לא מציגים כלום
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{form.title}</h2>

        <form onSubmit={handleSubmit} className="consultation-form">
          {/* שם מלא */}
          <div className="form-group">
            <label>שם מלא</label>
            <input
              type="text"
              placeholder="הכנס/י שם מלא"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>

          {/* טלפון */}
          <div className="form-group">
            <label>טלפון</label>
            <input
              type="tel"
              placeholder="הכנס/י מספר טלפון"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          {/* אימייל */}
          <div className="form-group">
            <label>כתובת אימייל</label>
            <input
              type="email"
              placeholder="הכנס/י כתובת אימייל"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* מה הכאב / מה תרצי להשיג */}
          <div className="form-group">
            <label>מה את רוצה להשיג או מה כרגע כואב לך?</label>
            <textarea
              placeholder="חברה הכי טובה בהשכרה? ספרי לי עוד..."
              value={formData.painPoints}
              onChange={(e) =>
                setFormData({ ...formData, painPoints: e.target.value })
              }
            />
          </div>

          {/* מיקום */}
          <div className="form-group">
            <label>מיקום</label>
            <input
              type="text"
              placeholder="עיר / אזור"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          {/* הערות נוספות */}
          <div className="form-group">
            <label>הערות נוספות</label>
            <textarea
              placeholder="שאמון שזה יעבוד כבר..."
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
            />
          </div>

          {/* כפתורים */}
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
