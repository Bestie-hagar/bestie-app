import { google } from "googleapis";
import path from "path";
import fs from "fs";

// טוען את האישורים מהקובץ
const credentialsPath = path.resolve(__dirname, "../credentials.json"); // מיקום הקובץ
const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));

// יצירת חיבור עם Google API
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"], // הרשאות עבור Google Sheets
});

const sheets = google.sheets({ version: "v4", auth });

// פונקציה לשמירת נתונים ב-Google Sheets
export const saveToGoogleSheet = async (data, sheetName) => {
  try {
    const SPREADSHEET_ID = "1bG_nAGcorpO6LAPsWhtl4QXJjVvc7umafgmTcDJyAR4"; // ID של הגיליון
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1`, // שמירת הנתונים בגיליון מסוים
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            data.fullName || "לא צוין שם",
            data.phone || "לא צוין טלפון",
            data.email || "לא צוין אימייל",
            data.notes || "אין הערות",
          ],
        ],
      },
    });

    console.log("Response from Google Sheets API:", response.data);
    return response.status === 200;
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return false;
  }
};
