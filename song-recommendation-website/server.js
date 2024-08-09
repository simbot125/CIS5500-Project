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

app.put('/api/users/:email', (req, res) => {
  console.log('Received update request for email:', req.params.email);
  console.log('Update data:', req.body);

  const { email } = req.params;
  const { newUsername, bio } = req.body;

  const query = `
    UPDATE Users
    SET username = ?, bio = ?
    WHERE email = ?
  `;

  connection.query(query, [newUsername, bio, email], (err, result) => {
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

app.post('/api/add-user', async (req, res) => {
  const { email, username } = req.body;

  try {
    // Check if user already exists based on email
    connection.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        return res.status(500).send('Error checking user');
      }

      if (results.length > 0) {
        console.log('User already exists:', results[0]);
        return res.status(200).send({ message: 'User already exists', user: results[0] });
      }

      // Check if username is unique
      connection.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
        if (err) {
          console.error('Error checking username:', err.stack);
          return res.status(500).send('Error checking username');
        }

        let newUsername = username;
        if (results.length > 0) {
          // If username is taken, append a number or create a unique username
          newUsername = `${username}_${Date.now()}`;
        }

        // Insert new user
        const passwordHash = bcrypt.hashSync(email + 'SOME_FIXED_SALT', 10);
        const query = 'INSERT INTO Users (username, email, password_hash, bio) VALUES (?, ?, ?, ?)';
        connection.query(query, [newUsername, email, passwordHash, ''], (err, result) => {
          if (err) {
            console.error('Error inserting user:', err.stack);
            return res.status(500).send('Error creating user');
          }
          console.log('New user created:', { username: newUsername, email, bio: '' });
          res.status(201).send({ message: 'User created', user: { username: newUsername, email, bio: '' } });
        });
      });
    });
  } catch (error) {
    console.error('Error processing user:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
