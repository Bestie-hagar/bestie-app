// src/App.js
import React, { useState } from "react";
import "./styles.css";

import {
  services,
  packages,
  ConsultationForm,
} from "./services/services";

import BookingModal from "./components/BookingModal";
import ConfirmationModal from "./components/ConfirmationModal";
import ServiceCard from "./components/ServiceCard";
import SplashScreen from "./components/SplashScreen";

import { sendTelegramNotification } from "./services/telegramService";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // מודל הזמנה
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // נתוני הטופס
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    location: "",
    date: "",
    time: "",
    notes: ""
  });

  // מצטרפת חדשה?
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  // מודל אישור
  const [showConfirmation, setShowConfirmation] = useState(false);

  // ======================
  // (הוספה) מודל הצטרפות לבסטי
  // ======================

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // בדיקת תקינות
    if (!formData.fullName || !formData.phone || !formData.date || !formData.time) {
        alert('נא למלא את כל השדות החובה');
        return;
    }

    const orderDetails = {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
        service: selectedService?.name,
        isPromo: isNewCustomer
    };

    console.log('Sending order:', orderDetails);
    
    const success = await sendTelegramNotification(orderDetails);
    if (success) {
        setShowBooking(false);
        setShowConfirmation(true);
    } else {
        alert('משהו השתבש בשליחה לטלגרם');
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

  // מסך פתיחה
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="app" dir="rtl">
      {/* (עננים צפים, Header, וכו' – לא משנים) */}
      <header>
        <h1>BESTIES</h1>
        <p>השירות שלא ידעת שאת צריכה</p>
      </header>

      {/* סימון האם מצטרפת חדשה */}
      <div className="toggle-new-customer">
        <label>
          <input
            type="checkbox"
            checked={isNewCustomer}
            onChange={(e) => setIsNewCustomer(e.target.checked)}
          />
          אני חדשה (סמני ל40% הנחה)
        </label>
      </div>


      {/* רשימת השירותים */}
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
              {pack.details && <p>{pack.details}</p>}
              {pack.extraInfo && <p>{pack.extraInfo}</p>}
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

      {/* מודל הזמנה לשירות */}
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
פעם ראשונה שלי, בא לי 40% הנחה
    
  );
}

export default App;
