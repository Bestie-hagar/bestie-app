
export const sendTelegramNotification = async (orderDetails) => {
  const TELEGRAM_TOKEN = "7571403492:AAF2gwAyi6gSTWc8cFHCTsLEBgIT3qe03OY";
  const CHAT_ID = "6245779959";

  if (!orderDetails || typeof orderDetails !== "object") {
    console.error("Invalid orderDetails provided:", orderDetails);
    return false;
  }

  const message = `
🎉 *הזמנה חדשה!* 🎉
👤 *שם מלא*: ${orderDetails.fullName}
📱 *טלפון*: ${orderDetails.phone}
📧 *אימייל*: ${orderDetails.email}
🏠 *כתובת*: ${orderDetails.address}
📍 *מיקום*: ${orderDetails.location === "home" ? "בבית 🏡" : orderDetails.location === "outside" ? "בחוץ 🌳" : orderDetails.location}
🎁 *שירות מבוקש*: ${orderDetails.service}
💭 *הערות*: ${orderDetails.notes}`;

  try {
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

    if (!response.ok) {
      console.error("Telegram API error:", data);
      return false;
    }

    console.log("Message sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
};
