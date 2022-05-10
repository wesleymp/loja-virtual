const { connection } = require('./connection');

const postManagementModel = async (id, quantity) => {
  const conn = await connection.connect();
  await conn.query(
    'UPDATE "user" SET "coin_quantity" = "coin_quantity" + $2 WHERE "id_user" = $1',
    [id, quantity],
  );
};

module.exports = postManagementModel;
