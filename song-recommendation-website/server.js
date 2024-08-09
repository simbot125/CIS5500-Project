const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); 

const connection = mysql.createConnection({
  host: 'songs.cn4k4su8glxp.us-east-1.rds.amazonaws.com', 
  user: 'admin', 
  password: 'Billy123', 
  database: 'music_data', 
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

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

// Route to check if a user exists and create if not
app.post('/api/register', async (req, res) => {
  const { username, email, password, bio } = req.body;

  // Check if the user already exists by email
  const checkUserQuery = 'SELECT * FROM Users WHERE email = ?';
  connection.query(checkUserQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error checking if user exists:', err.stack);
      return res.status(500).json({ error: 'An error occurred while checking if user exists' });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // If user does not exist, hash the password and insert new user
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery = 'INSERT INTO Users (username, email, password_hash, bio) VALUES (?, ?, ?, ?)';
      connection.query(insertUserQuery, [username, email, hashedPassword, bio], (err, result) => {
        if (err) {
          console.error('Error creating user:', err.stack);
          return res.status(500).json({ error: 'An error occurred while creating the user' });
        }
        res.status(201).json({ message: 'User created successfully' });
      });
    } catch (error) {
      console.error('Error hashing password:', error.stack);
      res.status(500).json({ error: 'An error occurred while creating the user' });
    }
  });
});

app.post('/api/ensure-user', (req, res) => {
  const { username, email, bio } = req.body;

  const checkUserQuery = 'SELECT * FROM Users WHERE email = ?';
  connection.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking if user exists:', err.stack);
      return res.status(500).json({ error: 'An error occurred while checking if user exists' });
    }

    if (results.length > 0) {
      // User already exists, return the existing user
      return res.status(200).json(results[0]);
    }

    // If user does not exist, create the user
    const createUserQuery = 'INSERT INTO Users (username, email, bio) VALUES (?, ?, ?)';
    connection.query(createUserQuery, [username, email, bio], (err, result) => {
      if (err) {
        console.error('Error creating user:', err.stack);
        return res.status(500).json({ error: 'An error occurred while creating the user' });
      }

      const newUser = {
        username,
        email,
        bio,
      };
      res.status(201).json(newUser);
    });
  });
});


// Route to update a user profile
app.put('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const { newUsername, bio } = req.body;

  const query = `
    UPDATE Users
    SET username = ?, bio = ?
    WHERE username = ?
  `;

  connection.query(query, [newUsername, bio, username], (err, result) => {
    if (err) {
      console.error('Error updating user profile:', err.stack);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.send('Profile updated successfully');
  });
});



app.post('/api/google-login', (req, res) => {
  const { email, username, bio } = req.body;

  // Check if the user already exists
  const checkUserQuery = 'SELECT * FROM Users WHERE email = ?';
  connection.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking if user exists:', err.stack);
      return res.status(500).json({ error: 'An error occurred while checking if user exists' });
    }

    if (results.length > 0) {
      // User already exists, return success
      return res.status(200).json({ message: 'User already exists' });
    }

    // If user does not exist, insert new user
    const insertUserQuery = 'INSERT INTO Users (username, email, bio) VALUES (?, ?, ?)';
    connection.query(insertUserQuery, [username || null, email, bio || null], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err.stack);
        return res.status(500).json({ error: 'An error occurred while creating the user' });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
