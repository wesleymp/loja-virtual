const { connection } = require('./connection');

const getUserModel = async (email) => {
  const conn = await connection.connect();
  const query = await conn.query(
    'SELECT * FROM "user" WHERE email = $1 LIMIT 1',
    [email],
  );
  return query;
};

module.exports = getUserModel;
