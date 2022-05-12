const { Pool } = require('pg');
require('dotenv').config();

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

connection.on('error', (err) => {
  console.error('DB error', err);
});

module.exports = {
  connection,
};
