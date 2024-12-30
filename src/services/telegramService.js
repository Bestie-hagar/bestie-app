export const sendTelegramNotification = async (orderDetails) => {
  const TELEGRAM_TOKEN = "7571403492:AAF2gwAyi6gSTWc8cFHCTsLEBgIT3qe03OY"; // Updated token
  const CHAT_ID = "6245779959"; // כאן הוסיפי את הצ'אט ID

  if (!TELEGRAM_TOKEN) {
    console.error("Telegram token is missing in environment variables.");
    return false;
  }

  if (!orderDetails || typeof orderDetails !== "object") {
    console.error("Invalid orderDetails provided:", orderDetails);
    return false;
  }

  const message = `
  🎉 *הזמנה חדשה!* 🎉
  👤 *שם מלא*: ${orderDetails.fullName || 'Not specified'}
  📱 *טלפון*: ${orderDetails.phone || 'Not specified'}
  📧 *אימייל*: ${orderDetails.email || 'Not specified'}
  🏠 *כתובת*: ${orderDetails.address || 'Not specified'}
  📍 *מיקום*: ${
    orderDetails.location === "home"
      ? "בבית 🏡"
      : orderDetails.location === "outside"
      ? "בחוץ 🌳"
      : 'Not specified'
  }
  🎁 *שירות מבוקש*: ${orderDetails.service || 'Not specified'}
  💭 *הערות*: ${orderDetails.notes || 'Not specified'}
  `;

  try {
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
      const error = await response.json();
      console.error("Telegram API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
};
