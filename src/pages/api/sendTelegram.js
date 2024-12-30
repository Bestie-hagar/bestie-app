// src/pages/api/sendTelegram.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = "6245779959";

  if (!TELEGRAM_TOKEN) {
    console.error('Telegram token is missing');
    return res.status(500).json({ success: false, error: 'Configuration error' });
  }

  const { fullName, phone, email, address, location, service, notes } = req.body;

  // Constructing the message with user inputs
  const message = `
  🎉 *הזמנה חדשה!* 🎉
  👤 *שם מלא*: ${fullName || 'Not specified'}
  📱 *טלפון*: ${phone || 'Not specified'}
  📧 *אימייל*: ${email || 'Not specified'}
  🏠 *כתובת*: ${address || 'Not specified'}
  📍 *מיקום*: ${location || 'Not specified'}
  🎁 *שירות מבוקש*: ${service || 'Not specified'}
  💭 *הערות*: ${notes || 'Not specified'}
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
      return res.status(500).json({ success: false, error: 'Failed to send message' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending telegram message:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
