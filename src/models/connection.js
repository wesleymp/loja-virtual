const { Pool } = require('pg');
require('dotenv').config();

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  pool: { min: 0, max: 10 },
  ssl: { rejectUnauthorized: false },
});

connection.on('error', (err) => {
  console.error('DB error', err);
});

module.exports = {
  connection,
};
