export const sendTelegramNotification = async (orderDetails) => {
  const TELEGRAM_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = "6245779959"; // הוסיפי את הצ'אט ID שלך

  if (!TELEGRAM_TOKEN) {
    console.error("Telegram token is missing in environment variables.");
    return false;
  }

  try {
    // Validate required fields
    const requiredFields = ["fullName", "phone", "email", "address", "service"];
    const missingFields = requiredFields.filter((field) => !orderDetails[field]);

    if (missingFields.length > 0) {
      console.error(`Missing fields: ${missingFields.join(", ")}`);
      return false;
    }

    const message = `
🎉 *הזמנה חדשה!* 🎉
👤 *שם מלא*: ${orderDetails.fullName}
📱 *טלפון*: ${orderDetails.phone}
📧 *אימייל*: ${orderDetails.email}
🏠 *כתובת*: ${orderDetails.address}
📍 *מיקום*: ${
      orderDetails.location === "home"
        ? "בבית 🏡"
        : orderDetails.location === "outside"
        ? "בחוץ 🌳"
        : ""
    }
🎁 *שירות מבוקש*: ${orderDetails.service}
💭 *הערות*: ${orderDetails.notes}
    `;

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
