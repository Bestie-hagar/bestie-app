export const sendTelegramNotification = async (orderDetails) => {
  const TELEGRAM_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = "6245779959";

  if (!TELEGRAM_TOKEN) {
    console.error("Telegram token is missing in environment variables.");
    return false;
  }

  const message = orderDetails.message || `
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
