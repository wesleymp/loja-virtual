const services = require('../services');

const getManagementController = async (_req, res, next) => {
  try {
    const managementData = await services.getManagementService();
    return res.status(managementData.status).json({ data: managementData.data });
  } catch (error) {
    return next(error);
  }
};

module.exports = getManagementController;
