import React, { useRef, useState } from "react";
import "./styles.css";

// קומפוננטת האישור
const ConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">היידה בסטי! 🎉</h2>
        <div className="modal-body">
          <p>רשמתי לפניי הכל</p>
          <p>נדבר בקרוב יפה אחת</p>
          <button onClick={onClose} className="modal-button">
            חזרה לדף הראשי
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({
  isOpen,
  onClose,
  service,
  formData,
  setFormData,
  onSubmit,
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          {service.icon} הזמנת {service.title}
        </h2>
        <form onSubmit={onSubmit} className="booking-form">
          <div className="form-group">
            <label>שם מלא</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>טלפון</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>מיקום</label>
            <select
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            >
              <option value="home">בבית</option>
              <option value="outside">בחוץ</option>
            </select>
          </div>
          <div className="form-group">
            <label>כתובת</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>תאריך</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>שעה</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>הערות</label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">
              שלחי הזמנה
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const services = [
  {
    id: 1,
    title: "אחות בדם",
    subtitle: "כשאת במחזור, חולה, או סתם עייפופית מידי",
    description:
      "אוכל מנחם עד הבית, משלוח תרופות אם צריך, תה\\שוקו כיד המלך, סידור קטן לבית והרבה חמלה ואורך רוח לטיפול מיטבי",
    duration: "שעתיים",
    investment: "300 ₪",
    extraInfo: "כל שעה נוספת: 100 ₪",
    icon: "❤️",
    color: "rose",
    buttonText: "צריכה חיבוק? 💝",
  },
  {
    id: 2,
    title: "נסיכה מסריחה",
    subtitle: "טיפוח שכל אחת צריכה עד הבית",
    description:
      "גבות שפם בחוט (ניקוי), מחליק או בייביליס, מסיכת פנים, הבהרת שיער פנים וגוף, הלבנת שיניים בייתית, מסז׳ קרקפת וכללי, נעשה יחד גם לק ברגליים וידיים, הסרת שיער בשעווה אם צריך וכל דבר אחר שתבחרי. בקלילות ועד הבית.",
    duration: "שעתיים",
    investment: "300 ₪",
    icon: "👸",
    color: "pink",
    buttonText: "מתחילות להתפנק! 💅",
  },
  {
    id: 3,
    title: "קיצי ליידי",
    subtitle: "מה שאת שומעת מאמי",
    description:
      "קיצי קיצי קיצי, הכי נעים שיש, לפני השינה או לבקרים מרגיעים, לפעמים תוך כדי מדיטציה או סתם כי מלא זמן לא עשו לך קיצי כמו שקיצי צריך להיות.",
    investment: "100 ₪ לשעת קיצי מלאה",
    icon: "😍",
    color: "pink",
    buttonText: "קיצר קצקצי לפה",
  },
  {
    id: 4,
    title: "חגיגה מהאגדות",
    subtitle: "פתרונות לאירועים מיוחדים",
    description:
      "ארוחת צהריים ל-20 אנשים? יום הולדת לאחיך הקטן? יש המון סידורים לקראת ואת לא יודעת מאיפה להתחיל? לא בטוחה איזו מתנה לבחור למאורע? אני אהיה העוזרת שלך תוך כדי האירוע וגם מרחוק, סיוע ברכישת ציוד, הזמנת ספקים, תיאום מקומות וכל דבר אחר",
    investment: "100 ₪ לשעה",
    extraInfo: "ציוד ומוצרים בתשלום נפרד",
    icon: "🎉",
    color: "purple",
    buttonText: "בואי נחגוג! 🎊",
  },
  {
    id: 5,
    title: "פיית המשימות",
    subtitle: "המשימות הקטנות שדוחים לאחר כך",
    description:
      "קניות בסופר כך שזה יגיע עד אלייך, תיאום תורים שונים, טיפול במשימות היום יום ואפילו סדר ביומן ובמייל...",
    investment: "100 ₪ לשעה",
    icon: "✨",
    color: "blue",
    buttonText: "יאללה לסדר! ✨",
  },
  {
    id: 6,
    title: "סוגרת לך את הפינה",
    subtitle: "עזרה בבירוקרטיה, ניירת ואיכס",
    description:
      "מיון מסמכים, הכנת חומר להנהלת חשבונות, מילוי טפסים מורכבים, טיפול בבעיות מול גופים רשמיים, ניהול וטיפול בפנסיה, בניית תקציב אישי וכל מה שתחשבי עליו (כן, גם ויזות)",
    duration: "3 שעות",
    investment: "150 ₪ לשעה",
    icon: "📋",
    color: "green",
    buttonText: "סוגרות עניין! 📋",
  },
  {
    id: 7,
    title: "מלכת הפינוקים",
    subtitle: "היום שכולו שלך!",
    description:
      "ערב מפנק, יום כיף אישי, תמיכה מנטלית ואפילו יציאה למקום הזה שאת כבר מלא זמן רוצה אבל אין לך עם מי, מגיע לך! בואי נהפוך יחד את היום לחלום",
    duration: "4 שעות",
    investment: "150 ₪ לשעה",
    extraInfo: "כולל פינוקים בשווי 200 ₪",
    icon: "👑",
    color: "yellow",
    buttonText: "מתחילות לחלום! 👑",
  },
  {
    id: 8,
    title: "אשתי לתואר",
    subtitle: "עזר כנגדך יפה שלי",
    description: "לומדות יחד למבחנים, מכינות יחד עבודות עד תואר שני כולל",
    duration: "3 שעות",
    investment: "150 ₪ לשעה",
    icon: "📚",
    color: "indigo",
    buttonText: "לומדות ביחד! 📚",
  },
  {
    id: 9,
    title: "חברה טלפונית",
    subtitle: "תמיד כאן בשבילך להקשיב",
    description:
      "דילמה? לא יודעת עם מי להתייעץ? צריכה מישהי שתקשיב לך בלי שיפוט ובלי סודות?",
    duration: "20 דקות",
    investment: "50 ₪",
    icon: "📞",
    color: "teal",
    buttonText: "מתקשרות? 📞",
  },
  {
    id: 10,
    title: "ווטסאפ גורלי",
    subtitle: "מילים שבאות מהלב",
    description:
      "עזרה מלאה בניסוח הודעות שקשה (פרידות, הודעות למנהל, ברכות והודעות לאקס)",
    investment: "20 ₪ להודעה",
    icon: "✍️",
    color: "cyan",
    buttonText: "כותבות ביחד! ✍️",
  },
  {
    id: 11,
    title: "מלכה של ספיישלים",
    subtitle: "יש לך משהו ספציפי בראש?",
    description:
      "לא מצאת בתפריט את מה שחיפשת? יש לך רעיון מיוחד משלך? כל שתבקשי לו יהי! ספרי לי מה את צריכה ונמצא ביחד את הפתרון המושלם",
    investment: "לפי תיאום",
    icon: "💫",
    color: "violet",
    buttonText: "בואי נגשים חלום! 💫",
  },
];

function App() {
  const scrollContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "home",
    address: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  const handleBooking = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `היי! ✨

אשמח להזמין ${selectedService.title} ${selectedService.icon}

פרטי ההזמנה:
👤 שם: ${formData.fullName}
📱 טלפון: ${formData.phone}
📍 מיקום: ${formData.location === "home" ? "בבית" : "בחוץ"}
🏠 כתובת: ${formData.address}
📅 תאריך: ${formData.date}
⏰ שעה: ${formData.time}

✨ הערות: ${formData.notes || "אין"}`;

    window.open(
      `https://wa.me/972585588100?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setIsModalOpen(false);
    setShowConfirmation(true);

    setFormData({
      fullName: "",
      phone: "",
      location: "home",
      address: "",
      date: "",
      time: "",
      notes: "",
    });
  };

  return (
    <div className="app" dir="rtl">
      <div className="floating-cloud cloud-1" />
      <div className="floating-cloud cloud-2" />
      <div className="floating-cloud cloud-3" />

      <header className="header">
        <h1>בסטי להשכרה 💝</h1>
        <p>חברה הכי טובה שתמיד חלמת עליה</p>
      </header>

      <div
        className="services-scroll"
        onWheel={handleWheel}
        ref={scrollContainerRef}
      >
        <div className="services-container">
          {services.map((service) => (
            <div key={service.id} className={`service-card ${service.color}`}>
              <div className="service-icon">{service.icon}</div>
              <h2>{service.title}</h2>
              <p className="subtitle">{service.subtitle}</p>
              <p className="description">{service.description}</p>
              <div className="details">
                {service.duration && <span>{service.duration}</span>}
                <span className="price">{service.investment}</span>
                {service.extraInfo && (
                  <span className="extra">{service.extraInfo}</span>
                )}
              </div>
              <button
                onClick={() => handleBooking(service)}
                className="book-button"
              >
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </div>
  );
}

export default App;
