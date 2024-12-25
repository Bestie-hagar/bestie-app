// App.js

import React, { useRef, useState } from "react";
import "./styles.css";
import { services, packages, ConsultationForm, BestieRegistration } from './services/services';
import { sendTelegramNotification } from './services/telegramService';
import BookingModal from './components/BookingModal';
import ConfirmationModal from './components/ConfirmationModal';
import ConsultationFormModal from './components/ConsultationFormModal';
import BestieRegistrationModal from './components/BestieRegistrationModal';
import SplashScreen from './components/SplashScreen';

function App() {
 const [showSplash, setShowSplash] = useState(true);
 const scrollContainerRef = useRef(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [showConfirmation, setShowConfirmation] = useState(false);
 const [selectedService, setSelectedService] = useState(null);
 const [isNewCustomer, setIsNewCustomer] = useState(true);
 const [showConsultation, setShowConsultation] = useState(false);
 const [showBestieForm, setShowBestieForm] = useState(false);
 
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
   const success = await sendTelegramNotification({
     ...formData,
     service: selectedService,
     isPromo: isNewCustomer
   });

   if (success) {
     setIsModalOpen(false);
     setShowConfirmation(true);
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

 if (showSplash) {
   return <SplashScreen onComplete={() => setShowSplash(false)} />;
 }

 return (
   <div className="app" dir="rtl">
     <div className="floating-cloud cloud-1" />
     <div className="floating-cloud cloud-2" />
     <div className="floating-cloud cloud-3" />

     <header className="header">
       <h1>BESTIES 💝</h1>
       <p>חברות טובות שתמיד חלמתם עליהם</p>
       <div className="header-actions">
         <button onClick={() => setShowConsultation(true)} className="consultation-button">
           🎁 ייעוץ חינם
         </button>
         <button onClick={() => setShowBestieForm(true)} className="bestie-button">
           ✨ רוצה להיות בסטי?
         </button>
       </div>
       {isNewCustomer && (
         <div className="promo-banner">
           🎉 מבצע למצטרפים חדשים - 40% הנחה! 
         </div>
       )}
     </header>

     <div className="services-grid">
       {services.map((service) => (
         <div key={service.id} className="service-tile">
           <div className="service-preview" onClick={() => handleBooking(service)}>
             <div className="service-icon">{service.icon}</div>
             <h3>{service.title}</h3>
           </div>
         </div>
       ))}
     </div>

     <div className="packages-section">
       <h2>חבילות מיוחדות</h2>
       <div className="packages-container">
         {packages.map((pack) => (
           <div key={pack.id} className="package-card">
             <h3>{pack.name}</h3>
             <div className="package-details">
               <p className="description">{pack.description}</p>
               <p className="details">{pack.details}</p>
               <p className="savings">{pack.savings}</p>
               <p className="price">
                 <span className="original-price">{pack.regularPrice}₪</span>
                 <span className="sale-price">{pack.salePrice}₪</span>
               </p>
               {pack.extraInfo && <p className="extra-info">{pack.extraInfo}</p>}
               {pack.bonus && <p className="bonus">{pack.bonus}</p>}
             </div>
             <button onClick={() => handleBooking(pack)} className="package-button">
               להזמנת החבילה
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

     <ConsultationFormModal
       isOpen={showConsultation}
       onClose={() => setShowConsultation(false)}
       form={ConsultationForm}
     />

     <BestieRegistrationModal
       isOpen={showBestieForm}
       onClose={() => setShowBestieForm(false)}
       form={BestieRegistration}
     />
   </div>
 );
}

export default App;
