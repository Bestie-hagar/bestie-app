// src/services/services.js

export const ConsultationForm = {
  title: "ייעוץ חינם",
  fields: [
    { name: "fullName", label: "שם מלא", type: "text", required: true },
    { name: "phone", label: "טלפון", type: "tel", required: true },
    { name: "email", label: "אימייל", type: "email", required: true },
    {
      name: "painPoints",
      label: "3 דברים שתקועים לי ואני חייבת לעשות",
      type: "textarea",
      required: true
    }
  ]
};

export const services = [
  {
    id: 1,
    title: "אחות על מלא",
    subtitle: "כשאת במחזור, חולה, או סתם עייפה מידי",
    description: `תמיכה בבית, נפשית, רגשית ופיזית כשהיום מכביד. 
כולל אוכל מנחם, משלוח תרופות אם צריך, תה/שוקו כיד המלך, 
סידור קטן לבית והרבה חמלה ואורך רוח.`,
    duration: "2 שעות",
    investment: "300",
    extraInfo: `כל שעה נוספת: 100 `,
    icon: "❤️",
    buttonText: "צריכה חיבוק? 💝",
    promoPrice: "180  לחברות חדשות"
  },
  {
    id: 2,
    title: "נוהל רוחה מסרוחה",
    subtitle: "טיפוח שכל אחת צריכה עד הבית",
    description: `גבות שפם בחוט (ניקוי), מחליק או בייביליס, מסיכת פנים, 
הבהרת שיער פנים וגוף, הלבנת שיניים ביתית, מסז׳ קרקפת וכללי, 
נעשה יחד גם לק ברגליים וידיים, הסרת שיער בשעווה אם צריך 
וכל דבר אחר שתבחרי. בקלילות ועד הבית!`,
    duration: "2 שעות",
    investment: "300",
    icon: "👸",
    buttonText: "מתחילות להתפנק! 💅",
    promoPrice: "180 לחברות חדשות"
  },
  {
    id: 3,
    title: "קיצי ליידי",
    subtitle: "מה שאת שומעת מאמי",
    description: `קיצי קיצי קיצי, הכי נעים שיש, לפני השינה או לבקרים מרגיעים. 
לפעמים תוך כדי מדיטציה, או סתם כי מלא זמן לא עשו לך קיצי 
כמו שקיצי צריך להיות.`,
     duration: "1 שעה",
    investment: "100 לשעת קיצי מלאה",
    icon: "😍",
    buttonText: "קיצר קצקצי לפה",
    promoPrice: "60 לחברות חדשות"
  },
  {
    id: 4,
    title: "חגיגה מהאגדות",
    subtitle: "פתרונות לאירועים מיוחדים",
    description: `ארוחת צהריים ל-20 אנשים? יום הולדת לאחיך הקטן? 
יש המון סידורים לקראת ואת לא יודעת מאיפה להתחיל? 
לא בטוחה איזו מתנה לבחור למאורע? 
אני אהיה העוזרת שלך תוך כדי האירוע וגם מרחוק, 
סיוע ברכישת ציוד, הזמנת ספקים, תיאום מקומות וכל דבר אחר.`,
     duration: "1 שעה",
    investment: "100 לשעה",
    extraInfo: `ציוד ומוצרים בתשלום נפרד`,
    icon: "🎉",
    buttonText: "בואי נחגוג! 🎊",
    promoPrice: "60 לחברות חדשות"
  },
  {
    id: 5,
    title: "פיית המשימות",
    subtitle: "המשימות הקטנות שדוחים לאחר כך",
    description: `קניות בסופר עד אלייך, תיאום תורים שונים, טיפול במשימות היום-יום 
ואפילו סדר ביומן ובמייל... 
בואי נוריד מהראש שלך את הבלגן!`,
     duration: "2 שעות",
    investment: "100 לשעה",
    icon: "✨",
    buttonText: "יאללה לסדר! ✨",
    promoPrice: "60 לחברות חדשות"
  },
  {
    id: 6,
    title: "AI מאמי!",
    subtitle: "בואי נכבוש את הטכנולוגיה ביחד",
    description: `את לא מסתדרת עם מערכות, תוכנות, AI וכל הסלט הזה? 
בואי נעשה את זה קליל וביחד! 
נלמד יד ביד איך להשתמש בכלים פופולריים (כמו Canva, חשבונית ירוקה ומיקרוסופט אופיס החדש) 
וגם בכלי AI שלא ידעת שקיימים.`,
     duration: "3 שעות",
    investment: "150 לשעה",
    icon: "🤖",
    buttonText: "יאללה נכבוש את ה-AI! 🤖",
    promoPrice: "90 לחברות חדשות"
  },
  {
    id: 7,
    title: "סוגרת לך את הפינה",
    subtitle: "עזרה בבירוקרטיה, ניירת ואיכס",
    description: `מיון מסמכים, הכנת חומר להנהלת חשבונות, מילוי טפסים מורכבים, 
טיפול בבעיות מול גופים רשמיים, ניהול וטיפול בפנסיה, 
בניית תקציב אישי וכל מה שתחשבי עליו (כן, גם ויזות).`,
    duration: "3 שעות",
    investment: "150 לשעה",
    icon: "📋",
    buttonText: "סוגרות עניין! 📋",
    promoPrice: "90 לחברות חדשות"
  },
  {
    id: 8,
    title: "מלכת הפינוקים",
    subtitle: "היום שכולו שלך!",
    description: `ערב מפנק, יום כיף אישי, תמיכה מנטלית ואפילו יציאה למקום הזה 
שאת כבר מלא זמן רוצה אבל אין לך עם מי. 
מגיע לך להתפנק באמת!`,
    duration: "4 שעות",
    investment: "150 לשעה",
    extraInfo: `כולל פינוקים בשווי 200 ₪`,
    icon: "👑",
    buttonText: "מתחילות לחלום! 👑",
    promoPrice: "90 לחברות חדשות"
  },
  {
    id: 9,
    title: "אשתי לתואר",
    subtitle: "עזר כנגדך יפה שלי",
    description: `לומדות יחד למבחנים, עבודות ופרויקטים אקדמיים. 
כולל:
- כלים מתקדמים של AI לכתיבה וניתוח
- ידע מעמיק בכתיבת עבודות אקדמיות
- הכנת מצגות מקצועיות
- שיטות יעילות להכנה למבחנים
- ליווי צמוד לאורך כל התהליך`,
    duration: "3 שעות",
    investment: "150 לשעה",
    icon: "📚",
    buttonText: "לומדות ביחד! 📚",
    promoPrice: "90 לחברות חדשות"
  },
  {
    id: 10,
    title: "חברה טלפונית",
    subtitle: "תמיד כאן בשבילך להקשיב",
    description: `דילמה? לא יודעת עם מי להתייעץ? 
צריכה מישהי שתקשיב לך בלי שיפוט ובלי סודות? 
בואי נדבר ותראי שהכול יותר קל יחד.`,
    duration: "20 דקות",
    investment: "50 ",
    icon: "📞",
    buttonText: "מתקשרות? 📞",
    promoPrice: "30 לחברות חדשות"
  },
  {
    id: 11,
    title: "ווטסאפ גורלי",
    subtitle: "מילים שבאות מהלב",
    description: `עזרה מלאה בניסוח הודעות שקשה (פרידות, הודעות למנהל, ברכות והודעות לאקס). 
אין צורך להתלבט לבד – ננסח ביחד!`,
    investment: "20 להודעה",
    icon: "✍️",
    buttonText: "כותבות ביחד! ✍️",
    promoPrice: "15 לחברות חדשות"
  },
  {
    id: 12,
    title: "מלכה של ספיישלים",
    subtitle: "יש לך משהו ספציפי בראש?",
    description: `לא מצאת בתפריט את מה שחיפשת? 
יש לך רעיון מיוחד משלך? כל שתבקשי לו יהי! 
ספרי לי מה את צריכה ונמצא ביחד את הפתרון המושלם.`,
    investment: "לפי תיאום",
    icon: "💫",
    buttonText: "בואי נגשים חלום! 💫"
  }
];

export const packages = [
  {
    id: "starter",
    name: "✨ חבילת היכרות",
    description: `2 מפגשים (סה״כ 6 שעות) של חוויה אישית. 
בחרי 2 שירותים לשילוב, ותיהני מטעימה מושלמת מבסטי!`,
    details: "בחירת 2 שירותים לשילוב לפי העדפתך",
    regularPrice: 750,
    salePrice: 450,
    savings: "חסכון של 300!"
  },
  {
    id: "monthly",
    name: "💝 חבילת VIP",
    description: `4 מפגשים מותאמים אישית + הפתעות מפנקות. 
שילוב של כמה שירותים לאורך החודש, עם פינוקים ייחודיים שיגיעו עד אלייך!`,
    details: "שילוב שירותים לבחירתך + פינוקים מיוחדים ליום-יום",
    extraInfo: `מושלם למי שרוצה ליווי צמוד ותמיכה במהלך כל התקופה`,
    regularPrice: 1670,
    salePrice: 960,
    savings: "חסכון של 710₪!"
  }
];

export const BestieRegistration = {
  title: "הצטרפי למשפחת בסטיז!",
  description: `יש לך מתנה ייחודית להעניק לעולם?
אולי את מומחית ביצירת אווירה רגועה, או יודעת בדיוק איך לארגן את החיים למישהו אחר?
אולי יש לך רעיון חדש לגמרי - משהו שעוד לא קיים?

בבסטיז את בוחרת:
✨ איזה שירות להציע
✨ איך להעניק אותו
✨ את התמחור שלך

כי רק את יודעת מה הערך הייחודי שלך ואיך להעביר אותו הלאה.`,
  fields: [
    {
      name: "fullName",
      label: "שם מלא",
      type: "text",
      required: true
    },
    {
      name: "phone",
      label: "טלפון",
      type: "tel",
      required: true
    },
    {
      name: "email",
      label: "אימייל",
      type: "email",
      required: true
    },
    {
      name: "giftToWorld",
      label: "מה המתנה הייחודית שלך לעולם?",
      type: "textarea",
      placeholder: "תארי את השירות/ים שהיית רוצה להציע",
      required: true
    },
    {
      name: "location",
      label: "איזור מגורים",
      type: "text",
      required: true
    }
  ]
};
