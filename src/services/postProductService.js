const models = require('../models');

const postProductService = async (name, price, filename) => {
  const imageUrl = `${process.env.BASE_URL}/images/products/${filename}`;
  await models.postProductModel(name, price, imageUrl);
  return { status: 201, message: 'Produto adicionado com sucesso' };
};

module.exports = postProductService;
