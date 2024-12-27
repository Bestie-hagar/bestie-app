import { google } from "googleapis";

// פונקציה לשמירה בגיליון גוגל
export const saveToGoogleSheet = async (data) => {
  try {
    // מחבר ל-Google באמצעות המפתח שהוכנס כ"סוד" ב-GitHub
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({ version: "v4", auth });

    // מזהה הגיליון שלך
    const spreadsheetId = "YOUR_SPREADSHEET_ID"; // שימי פה את ה-ID של הגיליון

    // איזה עמודות למלא
    const range = "Sheet1!A1:E1";

    // מה להוסיף לגיליון
    const values = [
      [data.fullName, data.phone, data.email, data.giftToWorld, data.location]
    ];

    // מוסיף את הנתונים לגיליון
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: { values }
    });

    console.log("הנתונים נשמרו בהצלחה!");
    return true;
  } catch (error) {
    console.error("שגיאה בשמירת הנתונים:", error);
    return false;
  }
};
