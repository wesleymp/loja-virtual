const services = require('../services');

const getProductController = async (_req, res, next) => {
  try {
    const productData = await services.getProductService();
    return res.status(productData.status).json({ data: productData.data });
  } catch (error) {
    return next(error);
  }
};

module.exports = getProductController;
