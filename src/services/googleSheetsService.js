import { google } from "googleapis";

// קריאת המפתח מתוך secrets בסביבה
const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export const saveToGoogleSheet = async (data, sheetName) => {
  try {
    const SPREADSHEET_ID = "1bG_nAGcorpO6LAPsWhtl4QXJjVvc7umafgmTcDJyAR4"; // ID של Google Sheets

    // שליחה ל-Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            data.fullName || "לא צוין שם",
            data.phone || "לא צוין טלפון",
            data.email || "לא צוין אימייל",
            data.giftToWorld || "לא צוין כישרון",
            data.location || "לא צוין איזור",
          ],
        ],
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error("שגיאה בשמירת נתונים ב-Google Sheets:", error);
    return false;
  }
};
