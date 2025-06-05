# 🎓 Online Learning Platform

A full-stack web platform for managing online course listings, instructor profiles, live events, and student queries. Built using **Node.js**, **Express**, **SQLite3**, and **EJS**, this application allows educational institutions to present essential course information in a clear, interactive format.

---

## ⭐ Key Features

### 📚 Course Management
- Browse available courses with instructor and duration details
- View course information in a responsive, card-style layout
- Dynamic data fetched from a SQLite database

### 👩‍🏫 Instructor Management
- Detailed profiles including bio, subjects taught, and contact info
- Instructor cards rendered from database records
- Each profile can link to associated courses and topics

### 📅 Event System
- View a calendar of upcoming live sessions and special events
- Support for recurring events (e.g. weekly Q&A)
- Data-driven event listings from SQLite
- Rendered dynamically via `/events` route

### 📬 Contact System
- Interactive contact form for student inquiries
- Submissions stored in the SQLite database
- Thank-you message shown upon submission

### 🔍 AJAX-powered course search with real-time filtering on the Courses page.

---

## ⚙️ Technologies Used

| Technology | Purpose                          |
|------------|----------------------------------|
| Node.js    | Backend server environment       |
| Express.js | Web routing and middleware       |
| SQLite3    | Lightweight relational database  |
| EJS        | Templating engine for dynamic HTML |
| HTML/CSS   | Front-end structure and styling  |
| JavaScript | Form validation and interactivity |

---

## 📂 Folder Structure

OnlineLearningPlatform/
├── node_modules/              # Node.js dependencies
├── public/                    # Static assets (CSS, images, client-side JS)
│   └── style.css
├── views/                     # EJS templates for dynamic pages
│   ├── partials/              # Shared components
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── contact.ejs
│   ├── courses.ejs
│   ├── events.ejs
│   ├── faq.ejs
│   ├── index.ejs
│   └── instructors.ejs
├── db.sqlite                  # SQLite database file
├── app.js                     # Main Express server
├── init_db.js                 # Script to create and seed the database
├── package.json               # Project metadata and dependencies
├── package-lock.json          # Dependency tree lock file
└── readme.md                  # Project documentation (you are here)

---

### 🔄 Enhanced Interactivity with AJAX

This project uses AJAX to create a seamless, interactive user experience:

#### 🔍 Live Course Search
- A dynamic search box allows users to filter courses instantly.
- Backend uses Express + SQLite to fetch matching data.

#### 🧠 Instructor Filter by Subject
- Dropdown filter fetches and displays instructors based on subjects.
- No page reload — results update dynamically via JavaScript and AJAX.

These features improve usability and performance by reducing full-page reloads.
