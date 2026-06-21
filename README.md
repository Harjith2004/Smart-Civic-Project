# 🏛️ SmartCivic — Automated Urban Complaint Classification System

> An AI-powered civic grievance management system using NLP (TF-IDF + Naïve Bayes), React.js dashboard, real-time analytics, and WhatsApp/Email notifications for automated complaint routing to municipal departments.


## 🔗 Links

- 🌐 **Live Demo:** [https://smart-civic-project.vercel.app/submit](https://smart-civic-project.vercel.app/submit)
- 💻 **GitHub:** [https://github.com/Harjith2004/Smart-Civic-Project](https://github.com/Harjith2004/Smart-Civic-Project)

---

## ✨ Features

- 🤖 **AI Classification** — Automatically classifies complaints into 5 civic categories using TF-IDF + Naïve Bayes
- ⚡ **Priority Detection** — Auto-detects HIGH / MEDIUM / LOW priority using keyword scoring
- 🎤 **Voice Input** — Submit complaints using Web Speech API voice recognition
- 📊 **Analytics Dashboard** — Bar charts, pie charts, line charts with Recharts
- 📋 **Complaint Log** — Filter, search, sort, update status, export CSV
- 📱 **WhatsApp Notifications** — Auto-notify municipal departments via Twilio API
- 📧 **Email Notifications** — HTML email reports via Gmail SMTP
- 🔄 **Status Management** — Track complaints from Open → Resolved
- 📍 **Location Extraction** — Auto-extracts location from complaint text

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React.js 18 | Frontend UI |
| React Router | Page navigation |
| Recharts | Data visualization charts |
| Python Streamlit | Original backend (v1) |
| scikit-learn | TF-IDF + Naïve Bayes ML |
| NLTK | Text preprocessing |
| Twilio API | WhatsApp notifications |
| Gmail SMTP | Email notifications |
| Pandas | CSV data storage |

---

## 🤖 ML Pipeline

```
User Input (Text/Voice)
       ↓
Text Preprocessing (lowercase, clean)
       ↓
TF-IDF Vectorization (scikit-learn)
       ↓
Multinomial Naïve Bayes Classification
       ↓
5 Categories:
  • Road & Infrastructure
  • Water Supply
  • Sanitation & Waste
  • Electricity
  • Public Safety
       ↓
Priority Detection (Keyword Scoring)
  HIGH → urgent, emergency, dangerous
  MEDIUM → repair, fix, broken
  LOW → minor, slight, inconvenience
       ↓
WhatsApp + Email Notification Sent
```

---

## 📁 Project Structure

```
smartcivic/
├── src/
│   ├── pages/
│   │   ├── Submit.jsx       ← Complaint form + AI analysis + voice input
│   │   ├── Dashboard.jsx    ← Analytics with 4 chart types + KPI cards
│   │   ├── Log.jsx          ← Complaint management + CSV export
│   │   └── Settings.jsx     ← WhatsApp/Email configuration
│   ├── components/
│   │   ├── Layout.jsx       ← Collapsible sidebar navigation
│   │   ├── Header.jsx       ← Page header with grid animation
│   │   └── Badge.jsx        ← Priority, Status, Category badges
│   ├── context/
│   │   └── ComplaintsContext.jsx ← Global state management
│   └── data/
│       └── mockData.js      ← Sample data + AI classifier logic
├── public/
└── package.json
```


## 📊 Dashboard Features

| Chart | Description |
|-------|-------------|
| KPI Cards | Total, High/Medium/Low, Resolution Rate, Notified count |
| Bar Chart | Complaints by category |
| Pie Chart | Priority distribution (donut) |
| Line Chart | 7-day complaint timeline by priority |
| Horizontal Bar | Complaints by status |

---

---

## 🎓 Academic Info

- **Institution:** A.V.C College of Engineering, Dept. of CSE
- **Project:** Final Year Academic Project
- **Batch:** 2022–2026

---

## 👨‍💻 Author

**Harjith K** — Aspiring Software Developer
- GitHub: [@Harjith2004](https://github.com/Harjith2004)
- LinkedIn: [harjith-k-839a55354](https://www.linkedin.com/in/harjith-k-839a55354)
- Email: harjithharjith40711@gmail.com

---

> ⭐ Star this repo if you found it useful!
