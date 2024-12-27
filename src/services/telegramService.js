// src/services/telegramService.js

export const sendTelegramNotification = async (orderDetails) => {
  // הטוקן שלך
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  // ה־Chat ID שלך
  const CHAT_ID = "6245779959";

  // הודעת הטלגרם עצמה
  const message = `
🎉 הזמנה חדשה!
👤 ${orderDetails.fullName}
📱 ${orderDetails.phone}
🎁 ${orderDetails.service.title}
💰 ${orderDetails.isPromo ? "מחיר מבצע!" : "מחיר רגיל"}
📍 ${orderDetails.location === "home" ? "בבית" : "בחוץ"}
🏠 ${orderDetails.address}
📅 ${orderDetails.date}
⏰ ${orderDetails.time}
💭 הערות: ${orderDetails.notes || "אין"}
  `;

  try {
    // יוצרים בקשת fetch ישירות ל־Telegram Bot API
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML"
        })
      }
    );

    // אם חזר "ok" – ההודעה נשלחה בהצלחה
    return response.ok;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
};
