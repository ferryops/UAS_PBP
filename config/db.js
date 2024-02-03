const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "uas_pbp_juniar_endin_suganda",
  debug: false,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

module.exports = pool.promise(); // Use promise() to enable async/await syntax
