import React from 'react';

const BookingModal = ({
  isOpen,
  onClose,
  service,
  formData,
  setFormData,
  onSubmit,
  isNewCustomer
}) => {
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
          <p className="description">{service.description}</p>
          <p className="price">מחיר: {service.investment}</p>
          {service.extraInfo && <p className="extra-info">{service.extraInfo}</p>}
        </div>
        <form onSubmit={onSubmit} className="booking-form">
          <div className="form-group">
            <label>שם מלא</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>טלפון</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>מיקום</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            >
              <option value="">בחר/י מיקום</option>
              <option value="home">בבית</option>
              <option value="outside">בחוץ</option>
            </select>
          </div>
          <div className="form-group">
            <label>כתובת</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>תאריך</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>שעה</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>הערות</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">
              {isNewCustomer ? 'הזמנה במחיר מבצע' : 'שליחת הזמנה'}
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
