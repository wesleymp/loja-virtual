const { connection } = require('./connection');

const getManagementModel = async (id, quantity) => {
  const conn = await connection.connect();
  const userData = await conn.query(
    'SELECT "id_user", "user_name", "email", "coin_quantity", "id_role" FROM "user"',
  );
  return userData;
};

module.exports = getManagementModel;
