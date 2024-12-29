const handleSubmit = async (e) => {
  e.preventDefault();

  // בדוק את ה-formData בקונסול
  console.log("Form data being sent:", formData);

  try {
    const message = `
    🎉 הזמנה חדשה!
    👤 שם מלא: ${formData.fullName || "לא צויין"}
    📱 טלפון: ${formData.phone || "לא צויין"}
    📍 מיקום: ${formData.location || "לא צויין"}
    🏠 כתובת: ${formData.address || "לא צויין"}
    📅 תאריך: ${formData.date || "לא צויין"}
    ⏰ שעה: ${formData.time || "לא צויין"}
    💭 הערות: ${formData.notes || "אין"}
    `;
    const telegramSuccess = await sendTelegramNotification({ message });

    if (!telegramSuccess) {
      alert("שגיאה בשליחה לטלגרם. נסי שוב מאוחר יותר.");
      return;
    }

    alert("הטופס נשלח בהצלחה!");
  } catch (error) {
    console.error("שגיאה:", error);
    alert("שגיאה כללית. נסי שוב מאוחר יותר.");
  }
};
