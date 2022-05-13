const pgp = require('pg-promise')();
require('dotenv').config();

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const connection = pgp(config);

module.exports = {
  connection,
};
