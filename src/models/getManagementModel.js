const { connection } = require('./connection');

const getManagementModel = async () => {
  const userData = await connection.query(
    'SELECT "id_user", "user_name", "email", "coin_quantity", "id_role" FROM "user"',
  );
  return userData;
};

module.exports = getManagementModel;
