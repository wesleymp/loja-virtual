const { connection } = require('./connection');

const postUserModel = async (name, password, email) => {
  const conn = await connection.connect();
  await conn.query(
    'INSERT INTO "user" ("user_name", "password", "email") VALUES ($1, $2, $3)',
    [name, password, email],
  );
};

module.exports = postUserModel;
