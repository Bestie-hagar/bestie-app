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
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    location: "",
    date: "",
    time: "",
    notes: ""
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
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

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="app" dir="rtl">
      <header>
        <h1>BESTIES</h1>
        <p>השירות שלא ידעת שאת צריכה</p>
      </header>

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

      <BookingModal
        isOpen={showBooking}
        service={selectedService}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleBookingSubmit}
        isNewCustomer={isNewCustomer}
        onClose={closeBookingModal}
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
