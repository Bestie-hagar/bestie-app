export const services = [
  {
    id: 1,
    title: "אחות על מלא",
    subtitle: "תמיכה כללית ברגעים המאתגרים",
    description: "תמיכה בבית, נפשית, רגשית ופיזית כשהיום מכביד במיוחד ואתם מותשים.",
    duration: "שעתיים",
    investment: "300 ₪",
    extraInfo: "כל שעה נוספת: 100 ₪",
    icon: "❤️",
    buttonText: "להזמנת תמיכה 💝",
    promoPrice: "180 ₪ למצטרפים חדשים"
  },
  {
    id: 2,
    title: "נוהל רוחה מסרוחה",
    subtitle: "טיפוח מקצועי עד הבית",
    description: "טיפולי טיפוח מקיפים: גבות, שיער, פנים, מניקור-פדיקור ועוד, הכל בנוחות ביתכם.",
    duration: "שעתיים",
    investment: "300 ₪",
    icon: "👸",
    buttonText: "להתחיל להתפנק! ✨",
    promoPrice: "180 ₪ למצטרפים חדשים"
  },
  // ... [המשך השירותים המעודכנים]
];

export const packages = [
  {
    id: "starter",
    name: "✨ חבילת BESTIES למתחילים",
    services: ["אחות על מלא", "נוהל רוחה מסרוחה"],
    duration: "4 שעות",
    regularPrice: 600,
    salePrice: 400,
    savings: "חסכון של 200₪!",
    gift: "ערכת טיפוח מפנקת"
  },
  {
    id: "monthly",
    name: "💝 חבילה חודשית VIP",
    visits: 4,
    hoursPerVisit: 2,
    regularPrice: 1200,
    salePrice: 800,
    savings: "חסכון של 400₪!",
    perVisitPrice: "200₪ לביקור",
    validity: "חודש",
    bonus: "כולל שיחת ייעוץ חינם"
  }
];
