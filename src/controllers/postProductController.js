const services = require('../services');

const postProductController = async (req, res, next) => {
  const { name, price } = req.body;
  const { filename } = req.file;
  try {
    const productData = await services.postProductService(name, price, filename);
    return res.status(productData.status).json({ message: productData.message });
  } catch (error) {
    return next(error);
  }
};

module.exports = postProductController;
