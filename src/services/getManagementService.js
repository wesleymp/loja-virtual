const models = require('../models');
const error = require('./helpers/error');

const getManagementService = async () => {
  const { rowCount, rows } = await models.getManagementModel();
  if (rowCount === 0) {
    throw error(404, 'Nenhum usuário cadastrado');
  }
  return { status: 200, data: rows };
};

module.exports = getManagementService;
