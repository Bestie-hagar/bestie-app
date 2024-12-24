export const sendTelegramNotification = async (orderDetails) => {
  const TELEGRAM_TOKEN = '7571403492:AAEsQwgfnXlXgrR6IRLzDRinB3wZM8zvlsU';
  const CHAT_ID = '6245779959';

  const message = `
🎉 הזמנה חדשה!
👤 ${orderDetails.fullName}
📱 ${orderDetails.phone}
🎁 ${orderDetails.service.title}
💰 ${orderDetails.isPromo ? 'מחיר מבצע!' : 'מחיר רגיל'}
📍 ${orderDetails.location === 'home' ? 'בבית' : 'בחוץ'}
🏠 ${orderDetails.address}
📅 ${orderDetails.date}
⏰ ${orderDetails.time}
💭 הערות: ${orderDetails.notes || 'אין'}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
};
