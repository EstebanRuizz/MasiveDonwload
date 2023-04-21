require('dotenv').config()
const { promisify } = require("util");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host     : process.env.ENV_DB_HOST,
  user     : process.env.ENV_DB_USER,
  database : process.env.ENV_DB_DATABASE,
  password : process.env.ENV_DB_PASSWORD,
  port     : process.env.ENV_DB_PORT,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }

  if (connection) connection.release();
  console.log("DB is Connected");

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);
module.exports = pool;
