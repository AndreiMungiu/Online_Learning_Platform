import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const db = new sqlite3.Database('./db.sqlite');

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Home page
app.get('/', (req, res) => res.render('index'));

// ✅ Courses page (JOIN with instructors to get tutor name)
app.get('/courses', (req, res) => {
  const query = `
    SELECT c.name, c.duration, i.name AS tutor
    FROM courses c
    JOIN instructors i ON c.tutor_id = i.id
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.render('courses', { courses: rows });
  });
});

// Tutors page
app.get('/instructors', (req, res) => {
  db.all('SELECT * FROM instructors', [], (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.render('instructors', { instructors: rows });
  });
});

// Events page
app.get('/events', (req, res) => {
  db.all('SELECT * FROM events', [], (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.render('events', { events: rows });
  });
});

// FAQ page
app.get('/faq', (req, res) => {
  db.all('SELECT * FROM faq', [], (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.render('faq', { faq: rows });
  });
});

// Contact page
app.get('/contact', (req, res) => res.render('contact', { submitted: false }));

// Contact form POST
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  db.run(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    err => {
      if (err) {
        console.error('❌ Contact form DB error:', err);
        return res.status(500).json({ success: false, error: 'Failed to save message.' });
      }
      res.json({ success: true });
    }
  );
});

// Quiz and Match Game
app.get('/quiz', (req, res) => res.render('quiz'));
app.get('/match-game', (req, res) => res.render('match-game'));

// AJAX search for courses
app.get('/search-courses', (req, res) => {
  const search = `%${req.query.q || ''}%`;
  db.all(`
    SELECT c.name, c.duration, i.name AS tutor
    FROM courses c
    JOIN instructors i ON c.tutor_id = i.id
    WHERE c.name LIKE ?
  `, [search], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Search failed' });
    res.json(rows);
  });
});

// AJAX filter for tutors
app.get('/search-instructors', (req, res) => {
  const search = `%${req.query.q || ''}%`;
  db.all('SELECT * FROM instructors WHERE subjects LIKE ?', [search], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Search failed' });
    res.json(rows);
  });
});

// Server start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
