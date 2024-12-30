
export const sendTelegramNotification = async (orderDetails) => {
  const TELEGRAM_TOKEN = "7571403492:AAF2gwAyi6gSTWc8cFHCTsLEBgIT3qe03OY";
  const CHAT_ID = "6245779959";

  if (!orderDetails || typeof orderDetails !== "object") {
    console.error("Invalid orderDetails provided:", orderDetails);
    return false;
  }

  // Ensure all required fields exist
  const safeOrderDetails = {
    fullName: orderDetails.fullName ? orderDetails.fullName : "לא צוין",
    phone: orderDetails.phone ? orderDetails.phone : "לא צוין",
    email: orderDetails.email ? orderDetails.email : "לא צוין",
    address: orderDetails.address ? orderDetails.address : "לא צוין",
    location: orderDetails.location ? orderDetails.location : "לא צוין",
    service: orderDetails.service ? orderDetails.service : "לא צוין",
    notes: orderDetails.notes ? orderDetails.notes : "אין הערות"
  };

  // בדיקת הנתונים לפני עיבוד
  console.log("Received order details:", orderDetails);

  console.log("Processing order details:", safeOrderDetails);

  const message = `
🎉 *הזמנה חדשה!* 🎉
👤 *שם מלא*: ${safeOrderDetails.fullName}
📱 *טלפון*: ${safeOrderDetails.phone}
📧 *אימייל*: ${safeOrderDetails.email}
🏠 *כתובת*: ${safeOrderDetails.address}
📍 *מיקום*: ${
    safeOrderDetails.location === "home" 
      ? "בבית 🏡" 
      : safeOrderDetails.location === "outside" 
        ? "בחוץ 🌳" 
        : safeOrderDetails.location
  }
🎁 *שירות מבוקש*: ${safeOrderDetails.service}
💭 *הערות*: ${safeOrderDetails.notes}`;

  try {
    console.log("Sending Telegram message:", message);
    
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown"
        }),
      }
    );

    const data = await response.json();
    console.log("Telegram API response:", data);

    if (!response.ok) {
      console.error("Telegram API error:", data);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
};
