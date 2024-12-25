// src/components/ConsultationFormModal.js

import React, { useState } from 'react';

const ConsultationFormModal = ({ isOpen, onClose, form }) => {
 const [formData, setFormData] = useState({
   fullName: '',
   phone: '',
   email: '',
   painPoints: ''
 });

 const handleSubmit = async (e) => {
   e.preventDefault();
   // כאן תתבצע שליחת הטופס לטלגרם/מייל
   onClose();
 };

 if (!isOpen) return null;

 return (
   <div className="modal-overlay">
     <div className="modal-content">
       <h2 className="modal-title">{form.title}</h2>
       <form onSubmit={handleSubmit} className="consultation-form">
         {form.fields.map((field) => (
           <div key={field.name} className="form-group">
             <label>{field.label}</label>
             {field.type === 'textarea' ? (
               <textarea
                 value={formData[field.name]}
                 onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                 required={field.required}
               />
             ) : (
               <input
                 type={field.type}
                 value={formData[field.name]}
                 onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                 required={field.required}
               />
             )}
           </div>
         ))}
         <div className="form-buttons">
           <button type="submit" className="submit-button">שליחה</button>
           <button type="button" onClick={onClose} className="cancel-button">ביטול</button>
         </div>
       </form>
     </div>
   </div>
 );
};

export default ConsultationFormModal;
