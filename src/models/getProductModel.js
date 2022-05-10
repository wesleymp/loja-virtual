const { connection } = require('./connection');

const getProductModel = async () => {
  const conn = await connection.connect();
  const productData = await conn.query(
    'SELECT * FROM "product"',
  );
  return productData;
};

module.exports = getProductModel;
