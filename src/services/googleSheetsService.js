import { google } from "googleapis";
import credentials from "../path-to/credentials.json"; // שימי כאן את הנתיב הנכון לקובץ ה-JSON שלך

// יצירת חיבור עם Google API
const auth = new google.auth.GoogleAuth({
  credentials, // הקובץ JSON עם האישורים שהורדת מגוגל
  scopes: ["https://www.googleapis.com/auth/spreadsheets"], // הרשאות עבור Google Sheets
});

const sheets = google.sheets({ version: "v4", auth });

// פונקציה לשמירת נתונים ב-Google Sheets
export const saveToGoogleSheet = async (data, sheetName) => {
  try {
    const SPREADSHEET_ID = "1bG_nAGcorpO6LAPsWhtl4QXJjVvc7umafgmTcDJyAR4"; // ה-ID של הקובץ שלך
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1`, // שמירת הנתונים בגיליון ספציפי
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[data.fullName, data.phone, data.email, data.notes || ""]], // שדות לכתיבה
      },
    });

    console.log("Response from Google Sheets API:", response.data);
    return response.status === 200;
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return false;
  }
};
