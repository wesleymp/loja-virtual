const { Pool } = require('pg');
require('dotenv').config();

const database = {
  host: process.env.DATABASE_HOST,
};

if (process.env.NODE_ENV === 'test') {
  database.host = process.env.DATABASE_HOST_TEST;
}

const connection = new Pool({
  connectionString: database.host,
});

module.exports = {
  connection,
};
