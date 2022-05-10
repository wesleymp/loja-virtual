const models = require('../models');
const error = require('./helpers/error');

const getProductService = async () => {
  const { rowCount, rows } = await models.getProductModel();
  if (rowCount === 0) {
    throw error(404, 'Nenhum produto cadastrado');
  }
  return { status: 200, data: rows };
};

module.exports = getProductService;
