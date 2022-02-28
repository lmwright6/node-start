const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.alison_database_server,
    port: process.env.alison_database_port,
    user: process.env.alison_database_username,
    password: process.env.alison_database_password,
    database: process.env.alison_database_name
  });


  pool.getConnection(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });



  module.exports = { pool };