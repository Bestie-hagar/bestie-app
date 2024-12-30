import React, { useState } from "react";
import { sendTelegramNotification } from "../services/telegramService";

const BestieRegistrationModal = ({ isOpen, onClose, form }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    giftToWorld: "",
    location: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone) {
        alert('נא למלא שם וטלפון');
        return;
    }

    try {
        const orderDetails = {
            messageType: 'bestie_application',
            message: `
✨ *${formData.fullName}* רוצה להצטרף לבסטי! ✨
📱 טלפון: ${formData.phone}
📧 אימייל: ${formData.email || "לא צוין"}
🎨 כישרונות: ${formData.giftToWorld || "לא צוין"}
📍 אזור פעילות: ${formData.location || "לא צוין"}
            `
        };

        const success = await sendTelegramNotification(orderDetails);
        
        if (success) {
            setIsSubmitted(true);
        } else {
            alert("שגיאה בשליחה לטלגרם. נסי שוב מאוחר יותר.");
        }
    } catch (error) {
        console.error("שגיאה בטיפול בטופס:", error);
        alert("שגיאה כללית. נסי שוב מאוחר יותר.");
    }
};

      setIsSubmitted(true);
    } catch (error) {
      console.error("שגיאה בטיפול בטופס:", error);
      alert("שגיאה כללית. נסי שוב מאוחר יותר.");
    }
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="modal-title">תודה על הרשמתך!</h2>
          <p>הפרטים התקבלו בהצלחה, ניצור איתך קשר בקרוב 🎉</p>
          <button onClick={onClose} className="glossy-button">
            סגור
          </button>
        </div>
      </div>
    );
  }

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
                      [field.name]: e.target.value,
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
                      [field.name]: e.target.value,
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
