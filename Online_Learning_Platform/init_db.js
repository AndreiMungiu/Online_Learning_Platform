const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    instructor TEXT,
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

  // Sample data
  db.run(`INSERT INTO courses (name, instructor, duration)
          VALUES ('Intro to Web Development', 'Alice Johnson', '6 weeks')`);

  db.run(`INSERT INTO courses (name, instructor, duration)
          VALUES ('JavaScript for Beginners', 'Bob Smith', '4 weeks')`);

  db.run(`INSERT INTO instructors (name, bio, subjects, contact)
          VALUES ('Alice Johnson', 'Web developer with 10 years experience', 'HTML, CSS, JavaScript', 'alice@example.com')`);

  db.run(`INSERT INTO instructors (name, bio, subjects, contact)
          VALUES ('Bob Smith', 'Software engineer and educator', 'Node.js, SQL, Express', 'bob@example.com')`);
          
  db.run(`INSERT INTO events (title, date, time, description)
          VALUES ('Live Q&A Session', 'Every Monday', '6:00 PM', 'Join to ask your questions live!')`);

  db.run(`INSERT INTO events (title, date, time, description)
          VALUES ('Guest Lecture: Web Technologies', '15 March 2025', '2:00 PM', 'Lecture by a leading expert in web development.')`);

});

db.close();
