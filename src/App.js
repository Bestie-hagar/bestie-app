import React, { useState } from "react";
import "./styles.css";

import {
  services,
  packages,
  ConsultationForm,
  BestieRegistration
} from "./services/services";
import { sendTelegramNotification } from "./services/telegramService";

import SplashScreen from "./components/SplashScreen";
import ServiceCard from "./components/ServiceCard";
import BookingModal from "./components/BookingModal";
import ConfirmationModal from "./components/ConfirmationModal";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    location: "",
    date: "",
    time: "",
    notes: ""
  });

  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // אחרי שהספלש מסתיים
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // שליחת הזמנה
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = {
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      service: selectedService,
      isPromo: isNewCustomer
    };

    const success = await sendTelegramNotification(orderDetails);
    if (success) {
      setShowBooking(false);
      setShowConfirmation(true);
    } else {
      alert("אירעה שגיאה בשליחה לטלגרם. נסי שוב מאוחר יותר.");
    }
  };

  const closeBookingModal = () => {
    setShowBooking(false);
    setFormData({
      fullName: "",
      phone: "",
      address: "",
      location: "",
      date: "",
      time: "",
      notes: ""
    });
  };

  return (
    <div className="app" dir="rtl">
      {/* עננים צפים במסך הראשי */}
      <div className="floating-cloud cloud-1"></div>
      <div className="floating-cloud cloud-2"></div>
      <div className="floating-cloud cloud-3"></div>

      {/* כותרת פשוטה - בלי לוגו כפול */}
      <header>
        <h1>BESTIES</h1>
        <p>השירות שלא ידעת שאת צריכה</p>
      </header>

      {/* האם אני מצטרפת חדשה */}
      <div className="toggle-new-customer">
        <label>
          <input
            type="checkbox"
            checked={isNewCustomer}
            onChange={(e) => setIsNewCustomer(e.target.checked)}
          />
          אני מצטרפת חדשה (מחיר מבצע)
        </label>
      </div>

      {/* שירותים */}
      <section className="services">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={() => {
              setSelectedService(service);
              setShowBooking(true);
            }}
          />
        ))}
      </section>

      {/* חבילות */}
      <section className="packages">
        <h2>חבילות מיוחדות</h2>
        <div className="packages-grid">
          {packages.map((pack) => (
            <div key={pack.id} className="package-card">
              <h3>{pack.name}</h3>
              <p>{pack.description}</p>
              <div className="price">
                <span className="original">{pack.regularPrice}₪</span>
                <span className="sale">{pack.salePrice}₪</span>
                <span className="savings">{pack.savings}</span>
              </div>
              <button
                className="glossy-button"
                onClick={() => {
                  setSelectedService(pack);
                  setShowBooking(true);
                }}
              >
                להזמנת החבילה
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* מודל הזמנה */}
      <BookingModal
        isOpen={showBooking}
        service={selectedService}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleBookingSubmit}
        isNewCustomer={isNewCustomer}
        onClose={closeBookingModal}
      />

      {/* מודל אישור */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        isNewCustomer={isNewCustomer}
      />
    </div>
  );
}

export default App;
