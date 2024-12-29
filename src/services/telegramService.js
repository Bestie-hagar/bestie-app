export const sendTelegramNotification = async (orderDetails) => {
  const TELEGRAM_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = "6245779959"; // וודאי שה-CHAT_ID נכון

  // בדיקה האם הטוקן קיים
  if (!TELEGRAM_TOKEN) {
    console.error("Telegram token is missing in environment variables.");
    return false;
  }

  // בדיקה האם orderDetails קיים ובמבנה נכון
  if (!orderDetails || typeof orderDetails !== "object") {
    console.error("Invalid orderDetails provided:", orderDetails);
    return false;
  }

  // בניית ההודעה לשליחה
  const message = `
🎉 הזמנה חדשה!
👤 ${orderDetails.fullName || "לא צויין"}
📱 ${orderDetails.phone || "לא צויין"}
🎁 ${orderDetails.serviceTitle || "לא צויין"}
💰 ${orderDetails.isPromo ? "מחיר מבצע!" : "מחיר רגיל"}
📍 ${orderDetails.location === "home" ? "בבית" : "בחוץ"}
🏠 ${orderDetails.address || "לא צויין"}
📅 ${orderDetails.date || "לא צויין"}
⏰ ${orderDetails.time || "לא צויין"}
💭 הערות: ${orderDetails.notes || "אין"}
  `;

  try {
    // קריאה ל-API של Telegram
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

    // בדיקה אם ה-API מחזיר תקלה
    if (!response.ok) {
      console.error("Telegram API returned an error");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
};
