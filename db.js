const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'songs.cn4k4su8glxp.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Billy123',
  database: 'music_data', 
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error trying to connect to db:', err.stack);
    return;
  }
  console.log('Connected to db' + connection.threadId);
});

module.exports = connection;
