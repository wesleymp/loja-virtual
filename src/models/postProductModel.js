const { connection } = require('./connection');

const postProductModel = async (name, price, imageUrl) => {
  await connection.query(
    'INSERT INTO "product" ("product_name", "price", "image_url") VALUES ($1, $2, $3)',
    [name, price, imageUrl],
  );
};

module.exports = postProductModel;
