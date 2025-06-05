const sqlite3 = require('sqlite3').verbose(); 
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  // Drop tables if they already exist (optional for dev cleanup)
  db.run(`DROP TABLE IF EXISTS courses`);
  db.run(`DROP TABLE IF EXISTS instructors`);
  db.run(`DROP TABLE IF EXISTS events`);
  db.run(`DROP TABLE IF EXISTS contacts`);
  db.run(`DROP TABLE IF EXISTS faq`);

  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    tutor TEXT,
    duration TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS instructors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    bio TEXT,
    subjects TEXT,
    contact TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    time TEXT,
    description TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS faq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT,
    answer TEXT
  )`);

  // Insert sample data
  db.run(`INSERT INTO courses (name, tutor, duration)
          VALUES 
          ('Introduction to Web Development', 'Alice Johnson', '6 weeks'),
          ('JavaScript for Beginners', 'Bob Smith', '4 weeks'),
          ('Frontend Frameworks', 'Sara Ahmed', '5 weeks'),
          ('Database Design Basics', 'Mark Lee', '3 weeks'),
          ('Python for Beginners', 'Jane Doe', '6 weeks')`);

  db.run(`INSERT INTO instructors (name, bio, subjects, contact)
          VALUES 
          ('Alice Johnson', 'Web developer with 10 years experience', 'HTML, CSS, JavaScript', 'alice@example.com'),
          ('Bob Smith', 'Software engineer and educator', 'Node.js, SQL, Express', 'bob@example.com'),
          ('Sara Ahmed', 'Front-end developer and UI designer.', 'HTML, CSS, React', 'sara@example.com'),
          ('Mark Lee', 'Database engineer with SQL expertise.', 'SQL, SQLite, Database Design', 'mark@example.com'),
          ('Jane Doe', 'Software engineer passionate about education and Python.', 'Python, Flask', 'jane@example.com')`);

  db.run(`INSERT INTO faq (question, answer)
          VALUES 
          ('What courses do you offer?', 'We offer a variety of web development courses including HTML, CSS, JavaScript, and Python.'),
          ('How do I contact a tutor?', 'Tutor contact details are listed on their profiles.'),
          ('Can I join multiple courses?', 'Yes, you can enroll in as many courses as you like.')`);

  db.run(`INSERT INTO events (title, date, time, description)
          VALUES 
          ('Live HTML & CSS Q&A', '2025-07-01', '18:00', 'Ask your questions live with our tutors.'),
          ('Introduction to SQL Webinar', '2025-07-10', '17:30', 'Beginner session for learning SQL basics.'),
          ('Frontend Masterclass', '2025-07-15', '16:00', 'Live workshop on React and responsive design.')`);
});

db.close();
