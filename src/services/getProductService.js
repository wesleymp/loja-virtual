const models = require('../models');
const error = require('./helpers/error');

const getProductService = async () => {
  const productsData = await models.getProductModel();
  if (productsData.length === 0) {
    throw error(404, 'Nenhum produto cadastrado');
  }
  return { status: 200, data: productsData };
};

module.exports = getProductService;
