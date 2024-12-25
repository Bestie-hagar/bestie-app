// App.js
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
  // מסך פתיחה
  const [showSplash, setShowSplash] = useState(true);

  // מודאל הזמנה
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // נתוני הטופס עבור ההזמנה
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    location: "",
    date: "",
    time: "",
    notes: ""
  });

  // האם מצטרפת חדשה (מחיר מבצע)
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  // כאשר לוחצים "שליחת הזמנה" במודל
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // בניית אובייקט פרטי ההזמנה
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

    // שליחת הודעה לטלגרם
    const success = await sendTelegramNotification(orderDetails);

    // אפשר לפתוח מודל אישור
    if (success) {
      setShowBooking(false);
      setShowConfirmation(true); // מפעיל מודל "תודה על ההזמנה"
    } else {
      alert("משהו השתבש בשליחה לטלגרם. אנא נסי שוב.");
    }
  };

  // מודל אישור ההזמנה (מוצג אחרי שליחת טלגרם)
  const [showConfirmation, setShowConfirmation] = useState(false);

  // פונקציה לאיפוס של הטופס כשסוגרים מודל
  const closeBookingModal = () => {
    setShowBooking(false);
    // איפוס formData
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

  // הצגת מסך הפתיחה עד תום האנימציה
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="app" dir="rtl">
      {/* כותרת */}
      <header>
        <div className="logo">
          <img src="/besties-logo.png" alt="Besties Logo" />
        </div>
        <div className="header-content">
          <h1>BESTIES</h1>
          <p>שירות שלא ידעת שאת צריכה</p>
        </div>
      </header>

      {/* תוכן מרכזי */}
      <main>
        {/* טוגול למצטרפת חדשה (לדוגמה) */}
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

        {/* חבילות מיוחדות */}
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
      </main>

      {/* מודל ביצוע הזמנה (BookingModal) */}
      <BookingModal
        isOpen={showBooking}
        onClose={closeBookingModal}
        service={selectedService}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleBookingSubmit}
        isNewCustomer={isNewCustomer}
      />

      {/* מודל אישור תודה */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        isNewCustomer={isNewCustomer}
      />
    </div>
  );
}

export default App;
