// src/pages/api/sendTelegram.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const TELEGRAM_TOKEN = process.env.RECT_APP_TELEGRAM_BOT_TOKEN; // Corrected to match the environment variable
  const CHAT_ID = "6245779959"; // Your chat ID

  if (!TELEGRAM_TOKEN) {
    console.error('Telegram token is missing');
    return res.status(500).json({ success: false, error: 'Configuration error' });
  }

  const message = req.body.message;
  
  try {
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
      throw new Error('Telegram API response was not ok');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending telegram message:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
