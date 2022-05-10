const { connection } = require('./connection');

const getUserModel = async (idUser) => {
  const conn = await connection.connect();
  const query = await conn.query(
    'SELECT * FROM "user" WHERE "id_user" = $1 LIMIT 1',
    [idUser],
  );
  return query;
};

module.exports = getUserModel;
