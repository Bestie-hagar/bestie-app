import React from "react";

const ConfirmationModal = ({ isOpen, onClose, isNewCustomer }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">תודה על ההזמנה! 🎉</h2>
        <div className="modal-body">
          <p>קיבלנו את ההזמנה שלך</p>
          <p>ניצור קשר בקרוב</p>
          {isNewCustomer && (
            <p className="welcome-message">
              ברוכים הבאים למשפחת BESTIES! 💝
              מחכים להעניק לך את החוויה המושלמת
            </p>
          )}
          <button onClick={onClose} className="glossy-button">
            סגירה
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
