import { google } from "googleapis";

// פונקציה לשמירה בגיליון גוגל
export const saveToGoogleSheet = async (data, sheetType) => {
  try {
    // התחברות לשירות Google
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({ version: "v4", auth });

    // מזהה הגיליון (Spreadsheet ID)
    const spreadsheetId = "1bG_nAGcorpO6LAPsWhtl4QXJjVvc7umafgmTcDJyAR4";

    // הגדרת הטווח לפי הסוג
    const range =
      sheetType === "חברות"
        ? "חברות!A:E" // גיליון חברות
        : "בסטיז!A:E"; // גיליון בסטיז

    // ערכים להוספה
    const values =
      sheetType === "חברות"
        ? [[data.fullName, data.phone, data.email, data.service, data.notes]]
        : [[data.fullName, data.phone, data.email, data.giftToWorld, data.location]];

    // הוספת נתונים לגיליון
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: { values }
    });

    console.log(`הנתונים נשמרו בגיליון ${sheetType} בהצלחה!`);
    return true;
  } catch (error) {
    console.error(`שגיאה בשמירת הנתונים בגיליון ${sheetType}:`, error);
    return false;
  }
};
