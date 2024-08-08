const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware to enable CORS
app.use(cors());

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'songs.cn4k4su8glxp.us-east-1.rds.amazonaws.com', // Replace with your RDS endpoint
  user: 'admin', // Replace with your DB user
  password: 'Billy123', // Replace with your DB password
  database: 'music_data', // Replace with your DB name
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Define routes

// Route to get billboard data
app.get('/billboard_data', (req, res) => {
  const query = 'SELECT * FROM billboard_data';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

// Route to get spotify data
app.get('/spotify_data', (req, res) => {
  const query = 'SELECT * FROM spotify_data';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});


app.post('/api/register', async (req, res) => {
  const { username, email, password, display_name, bio } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO Users (username, email, password_hash, display_name, bio) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, display_name, bio]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
