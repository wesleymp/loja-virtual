const { connection } = require('./connection');

const getProductModel = async () => {
  const productData = await connection.query(
    'SELECT * FROM "product"',
  );
  return productData;
};

module.exports = getProductModel;
