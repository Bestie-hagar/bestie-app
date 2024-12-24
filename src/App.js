import React, { useRef, useState } from "react";
import "./styles.css";
import { services, packages } from './services/services';
import { sendTelegramNotification } from './services/telegramService';
import BookingModal from './components/BookingModal';
import ConfirmationModal from './components/ConfirmationModal';

function App() {
  const scrollContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isNewCustomer, setIsNewCustomer] = useState(true); // ניתן לשנות בהמשך לפי היסטוריית לקוחות
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    address: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  const handleBooking = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // שליחה לטלגרם
    const success = await sendTelegramNotification({
      ...formData,
      service: selectedService,
      isPromo: isNewCustomer
    });

    if (success) {
      setIsModalOpen(false);
      setShowConfirmation(true);

      // איפוס הטופס
      setFormData({
        fullName: "",
        phone: "",
        location: "",
        address: "",
        date: "",
        time: "",
        notes: "",
      });
    }
  };

  return (
    <div className="app" dir="rtl">
      {/* עננים */}
      <div className="floating-cloud cloud-1" />
      <div className="floating-cloud cloud-2" />
      <div className="floating-cloud cloud-3" />

      <header className="header">
        <h1>BESTIES 💝</h1>
        <p>חברות טובות שתמיד חלמתם עליהם</p>
        {isNewCustomer && (
          <div className="promo-banner">
            🎉 מבצע למצטרפים חדשים - 40% הנחה! 
          </div>
        )}
      </header>

      {/* חבילות */}
      <div className="packages-section">
        <h2>חבילות מיוחדות</h2>
        <div className="packages-container">
          {packages.map((pack) => (
            <div key={pack.id} className="package-card">
              <h3>{pack.name}</h3>
              <div className="package-details">
                <p className="savings">{pack.savings}</p>
                <p className="price">
                  <span className="original-price">{pack.regularPrice}₪</span>
                  <span className="sale-price">{pack.salePrice}₪</span>
                </p>
                {pack.bonus && <p className="bonus">{pack.bonus}</p>}
              </div>
              <button onClick={() => handleBooking(pack)} className="package-button">
                להזמנת החבילה
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* שירותים */}
      <div
        className="services-scroll"
        onWheel={handleWheel}
        ref={scrollContainerRef}
      >
        <div className="services-container">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h2>{service.title}</h2>
              <p className="subtitle">{service.subtitle}</p>
              <p className="description">{service.description}</p>
              <div className="details">
                {service.duration && <span>{service.duration}</span>}
                <span className="price">{service.investment}</span>
                {service.extraInfo && (
                  <span className="extra">{service.extraInfo}</span>
                )}
                {isNewCustomer && service.promoPrice && (
                  <span className="promo-price">{service.promoPrice}</span>
                )}
              </div>
              <button
                onClick={() => handleBooking(service)}
                className="book-button"
              >
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isNewCustomer={isNewCustomer}
      />

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        isNewCustomer={isNewCustomer}
      />
    </div>
  );
}

export default App;
