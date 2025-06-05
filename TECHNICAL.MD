# ⚙️ Technical Documentation — Online Learning Platform

This document outlines the technical architecture, logic, and tools used to implement the Online Learning Platform for the Web Technologies assessment.

---

## ✅ Technologies Used

| Stack        | Role                              |
|--------------|------------------------------------|
| **Node.js**  | JavaScript runtime, backend logic |
| **Express.js** | Web server and routing            |
| **SQLite3**  | Lightweight relational database   |
| **EJS**      | Server-side template rendering    |
| **HTML/CSS** | Markup and styling                |
| **JavaScript** | Form interaction and validation |

---

## 🧠 Core Functionality Breakdown

### 1. Server (`app.js`)
- Sets up an Express server on port `5000`
- Configures EJS as the view engine
- Connects to `db.sqlite` to access stored data
- Defines routes for pages like:
  - `/courses` (from database)
  - `/instructors` (from database)
  - `/events` (from database)
  - `/contact` (form submission → database)

### 2. Database (`db.sqlite`)
- Created and seeded by `init_db.js`
- Contains the following tables:
  - `courses (id, name, instructor, duration)`
  - `instructors (id, name, bio, subjects, contact)`
  - `events (id, title, date, time, description)`
  - `contacts (id, name, email, message)`

### 3. Views (`views/*.ejs`)
- All user-facing pages use EJS templates:
  - `index.ejs` – Welcome page
  - `courses.ejs` – Lists courses using `<%= %>` EJS tags
  - `instructors.ejs` – Renders profiles from DB
  - `events.ejs` – Lists upcoming sessions in a table
  - `contact.ejs` – Form POSTs to server and confirms success
- `partials/header.ejs` and `footer.ejs` are included on every page

### 4. Styling (`public/style.css`)
- Shared styles for layout, cards, buttons, and tables
- Uses `.card`, `.container`, and table classes
- Consistent visual theme across all pages

### 5. Contact Form Flow
- User fills form at `/contact`
- Form posts to `/contact` using POST
- Server inserts data into `contacts` table
- Page re-renders with `submitted: true` and shows thank-you message

### 6. AJAX Features

#### A. Course Search (AJAX + Database)
- User types in a search box on `/courses`
- JavaScript sends a GET request to `/search-courses?q=...`
- Backend runs a SQL query and returns matching courses as JSON
- JavaScript updates the page with filtered cards (no reload)

#### B. Instructor Filter by Subject (AJAX + Database)
- User selects a subject from a dropdown on `/instructors`
- JS fetches `/search-instructors?q=...`
- Server returns matching instructor profiles from SQLite
- Page updates live using client-side rendering

---

### 🔐 Security and Validation Considerations

This project includes several features to enhance basic security and ensure proper user input handling:

#### 🧾 Input Validation
- **Client-Side Validation**:  
  The `contact.ejs` form includes JavaScript validation for required fields and a proper email format using RegEx.
- **Server-Side Validation**:  
  Inputs from the contact form are validated and sanitized before being inserted into the database using parameterized SQL queries to prevent SQL injection.

#### 🧱 SQL Injection Protection
- All queries use `?` placeholders with `sqlite3`'s `run()` and `all()` methods to avoid SQL injection.
  ```js
  db.run(`INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`, [...])
  ```

#### 🔒 XSS Mitigation
- Dynamic content rendered through EJS uses escaped `<%= %>` syntax (not `<%- %>`) to prevent cross-site scripting (XSS).
- No user-generated HTML is directly injected into the DOM.

#### 📁 Directory Access Control
- Static files are served from a controlled `/public` folder.
- Sensitive files like `db.sqlite` and server logic (`app.js`, `init_db.js`) are not exposed to the frontend.

#### 🚫 No Cookies or Sessions
- This educational platform does not use authentication, cookies, or sessions, minimizing session hijacking risks.

---

## 🚀 How to Run the Project

```bash
npm install         # Install dependencies
node init_db.js     # Create and seed database
node app.js         # Start the Express server
```

Then open:
👉 `http://localhost:5000`

---

