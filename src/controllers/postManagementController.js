const services = require('../services');

const postManagementController = async (req, res, next) => {
  const { id, quantity } = req.body;
  try {
    const managementData = await services.postManagementService(id, quantity);
    return res.status(managementData.status).json({ message: managementData.message });
  } catch (error) {
    return next(error);
  }
};

module.exports = postManagementController;
