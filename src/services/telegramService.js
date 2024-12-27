// src/services/telegramService.js
export const sendTelegramNotification = async (orderDetails) => {
  // משתמשים במשתנה הסביבה המאובטח
  const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = "6245779959";
  
  if (!TELEGRAM_TOKEN) {
    console.error("Telegram token is missing!");
    return false;
  }
  
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
    console.log("Starting to send telegram message..."); // לוג לבדיקה
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      }
    );
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Telegram API error:", errorData);
      return false;
    }
    
    console.log("Telegram message sent successfully!"); // לוג לבדיקה
    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
};
