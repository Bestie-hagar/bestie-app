export const sendTelegramNotification = async (orderDetails) => {
  // שימוש במשתנה הסביבה שהגדרת
  const TELEGRAM_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN; // זה משתנה הסביבה שהגדרת
  const CHAT_ID = "6245779959"; // ודא שה-CHAT_ID תקין ונכון

  // בדיקה אם הטוקן קיים
  if (!TELEGRAM_TOKEN) {
    console.error("Telegram token is missing in environment variables.");
    return false;
  }

  // בדיקה אם הפרטים שהוזנו תקינים
  if (!orderDetails || typeof orderDetails !== "object") {
    console.error("Invalid orderDetails provided:", orderDetails);
    return false;
  }

  // יצירת הודעת טקסט
  const message = `
🎉 הזמנה חדשה!
👤 שם מלא: ${orderDetails.fullName || "לא צויין"}
📱 טלפון: ${orderDetails.phone || "לא צויין"}
🎁 שירות: ${orderDetails.serviceTitle || "לא צויין"}
💰 ${orderDetails.isPromo ? "מחיר מבצע!" : "מחיר רגיל"}
📍 מיקום: ${orderDetails.location === "home" ? "בבית" : "בחוץ"}
🏠 כתובת: ${orderDetails.address || "לא צויין"}
📅 תאריך: ${orderDetails.date || "לא צויין"}
⏰ שעה: ${orderDetails.time || "לא צויין"}
💭 הערות: ${orderDetails.notes || "אין"}
  `;

  try {
    // שליחת ההודעה ל-Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Telegram API response was not ok");
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
};
