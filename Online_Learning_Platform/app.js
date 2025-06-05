const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./db.sqlite');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => res.render('index'));

app.get('/courses', (req, res) => {
  db.all('SELECT * FROM courses', [], (err, rows) => {
    if (err) return res.send("Error loading courses");
    res.render('courses', { courses: rows });
  });
});

app.get('/instructors', (req, res) => {
  db.all('SELECT * FROM instructors', [], (err, rows) => {
    if (err) return res.send("Error loading instructors");
    res.render('instructors', { instructors: rows });
  });
});

app.get('/events', (req, res) => {
    db.all('SELECT * FROM events', [], (err, rows) => {
      if (err) {
        console.error(err);
        res.send("Error loading events");
      } else {        
        res.render('events', { events: rows });
      }
    });
  });
  
  
app.get('/faq', (req, res) => {
    res.render('faq');
  });

  app.get('/contact', (req, res) => {
    res.render('contact', { submitted: false });
  });
  
  app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
  
    db.run(
      `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`,
      [name, email, message],
      (err) => {
        if (err) {
          console.error(err);
          res.send("There was an error saving your message.");
        } else {
          res.render('contact', { submitted: true });
        }
      }
    );
  });
  
  
// Server Start
app.listen(5000, () => {
  console.log(' Server running at http://localhost:5000');
});
