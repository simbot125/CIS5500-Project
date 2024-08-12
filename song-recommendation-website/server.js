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

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    connection.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        return res.status(500).send({ message: 'Error checking user' });
      }

      if (results.length > 0) {
        return res.status(400).send({ message: 'User already exists' });
      }

      // Hash the password
      const passwordHash = bcrypt.hashSync(password, 10);

      // Insert the new user
      const query = 'INSERT INTO Users (email, password_hash) VALUES (?, ?)';
      connection.query(query, [email, passwordHash], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err.stack);
          return res.status(500).send({ message: 'Error creating user' });
        }
        console.log('New user created:', { email });
        res.status(201).send({ message: 'User created', user: { email } });
      });
    });
  } catch (error) {
    console.error('Error processing registration:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    connection.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        return res.status(500).send({ message: 'Error checking user' });
      }

      if (results.length === 0) {
        return res.status(400).send({ message: 'User not found' });
      }

      const user = results[0];

      // Compare the hashed password
      if (!bcrypt.compareSync(password, user.password_hash)) {
        return res.status(400).send({ message: 'Invalid credentials' });
      }

      // If successful, return user data
      res.status(200).send({ message: 'Login successful', user: { email: user.email, username: user.username } });
    });
  } catch (error) {
    console.error('Error processing login:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.get('/year/:year', (req, res) => {
  const year = req.params.year;

  const billboardQuery = 'SELECT * FROM billboard_data WHERE YEAR(date) = ?';
  const spotifyQuery = 'SELECT * FROM spotify_data WHERE YEAR(track_album_release_date) = ?';

  connection.query(billboardQuery, [year], (billboardErr, billboardResults) => {
    if (billboardErr) {
      console.error('Error executing Billboard query:', billboardErr.stack);
      return res.status(500).send('Error executing Billboard query');
    }

    connection.query(spotifyQuery, [year], (spotifyErr, spotifyResults) => {
      if (spotifyErr) {
        console.error('Error executing Spotify query:', spotifyErr.stack);
        return res.status(500).send('Error executing Spotify query');
      }

      // Combine results (assuming you want to merge the first result from both tables)
      const yearData = {
        year: year,
        most_popular_song: billboardResults[0]?.song || 'N/A',
        most_popular_artist: billboardResults[0]?.artist || 'N/A',
        valence: spotifyResults[0]?.valence || 'N/A',
        tempo: spotifyResults[0]?.tempo || 'N/A',
        key: spotifyResults[0]?.track_key || 'N/A',
        danceability: spotifyResults[0]?.danceability || 'N/A',
      };

      res.json(yearData);
    });
  });
});

app.post('/playlists', (req, res) => {
  const {
    genre,
    popularity,
    popularityFilterType,
    danceability,
    danceabilityFilterType,
    tempo,
    tempoFilterType
  } = req.body;

  let query = 'SELECT * FROM spotify_data WHERE 1=1'; 

  const filters = [];

  if (genre) {
    query += ' AND playlist_genre = ?';
    filters.push(genre);
  }

  if (popularity) {
    if (popularityFilterType === 'exact') {
      query += ' AND track_popularity = ?';
    } else {
      query += ' AND track_popularity >= ?';
    }
    filters.push(Number(popularity));
  }

  if (danceability) {
    if (danceabilityFilterType === 'exact') {
      query += ' AND ROUND(danceability, 2) = ROUND(?, 2)';
    } else {
      query += ' AND danceability >= ?';
    }
    filters.push(Number(danceability));
  }

  if (tempo) {
    if (tempoFilterType === 'exact') {
      query += ' AND ROUND(tempo, 2) = ROUND(?, 2)';
    } else {
      query += ' AND tempo >= ?';
    }
    filters.push(Number(tempo));
  }

  console.log('Executing query:', query);
  console.log('With parameters:', filters);

  connection.query(query, filters, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      return res.status(500).send('Error executing query');
    }
    res.json(results);
  });
});

app.get('/search', (req, res) => {
  const query = req.query.q;
  const searchQuery = `%${query}%`; // Use wildcards for partial matching

  const sql = `
    SELECT * FROM spotify_data
    WHERE track_name LIKE ? OR track_artist LIKE ?
  `;

  connection.query(sql, [searchQuery, searchQuery], (err, results) => {
    if (err) {
      console.error('Error executing search query:', err.stack);
      return res.status(500).send('Error executing search query');
    }
    res.json(results); // Send the results as JSON
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
