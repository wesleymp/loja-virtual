const models = require('../models');

const postManagementService = async (id, quantity) => {
  await models.postManagementModel(id, quantity);
  return { status: 201, message: 'Moeda adicionada com sucesso!' };
};

module.exports = postManagementService;
