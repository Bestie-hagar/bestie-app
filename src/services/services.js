// src/services/services.js

export const ConsultationForm = {
  title: "ייעוץ חינם",
  fields: [
    { name: "fullName", label: "שם מלא", type: "text", required: true },
    { name: "phone", label: "טלפון", type: "tel", required: true },
    { name: "email", label: "אימייל", type: "email", required: true },
    {
      name: "painPoints",
      label: "3 דברים שתקועים לי ואני חייבת לעשות",
      type: "textarea",
      required: true
    }
  ]
};

export const services = [
  // כל השירותים שלך, עם "icon": "🦄", "❤️", וכדומה
];

export const packages = [
  // חבילות...
];

export const BestieRegistration = {
  title: "הצטרפי למשפחת בסטיז!",
  description: `יש לך מתנה ייחודית...`,
  fields: [
    // ...
  ]
};
