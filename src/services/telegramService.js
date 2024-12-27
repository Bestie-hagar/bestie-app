// src/services/telegramService.js
export const sendTelegramNotification = async (orderDetails) => {
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
    const response = await fetch('/api/sendTelegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error response:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
};
