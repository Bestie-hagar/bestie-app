// App.js
import React, { useRef, useState } from "react";
import "./styles.css";
import { services, packages, ConsultationForm, BestieRegistration } from './services/services';
import SplashScreen from './components/SplashScreen';
import ServiceCard from './components/ServiceCard';
import BookingModal from './components/BookingModal';

function App() {
 const [showSplash, setShowSplash] = useState(true);
 const [selectedService, setSelectedService] = useState(null);
 const [showBooking, setShowBooking] = useState(false);

 if (showSplash) {
   return <SplashScreen onComplete={() => setShowSplash(false)} />;
 }

 return (
   <div className="app" dir="rtl">
     <header>
       <div className="logo">
         <img src="/besties-logo.png" alt="Besties Logo" />
       </div>
       <div className="header-content">
         <h1>BESTIES</h1>
         <p>שירות שלא ידעת שאת צריכה</p>
       </div>
     </header>

     <main>
       <section className="services">
         {services.map(service => (
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
           {packages.map(pack => (
             <div key={pack.id} className="package-card">
               <h3>{pack.name}</h3>
               <p>{pack.description}</p>
               <div className="price">
                 <span className="original">{pack.regularPrice}₪</span>
                 <span className="sale">{pack.salePrice}₪</span>
               </div>
               <button onClick={() => {
                 setSelectedService(pack);
                 setShowBooking(true);
               }}>
                 להזמנת החבילה
               </button>
             </div>
           ))}
         </div>
       </section>
     </main>

     <BookingModal 
       isOpen={showBooking}
       service={selectedService}
       onClose={() => setShowBooking(false)}
     />
   </div>
 );
}

export default App;
