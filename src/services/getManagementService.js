const models = require('../models');
const error = require('./helpers/error');

const getManagementService = async () => {
  const usersData = await models.getManagementModel();
  if (usersData.length === 0) {
    throw error(404, 'Nenhum usuário cadastrado');
  }
  return { status: 200, data: usersData };
};

module.exports = getManagementService;
