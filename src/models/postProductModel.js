const { connection } = require('./connection');

const postProductModel = async (name, price, imageUrl) => {
  const conn = await connection.connect();
  await conn.query(
    'INSERT INTO "product" ("name", "price", "image_url") VALUES ($1, $2, $3)',
    [name, price, imageUrl],
  );
};

module.exports = postProductModel;
