const validateQuantityMiddleware = (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity || quantity === '') {
    return res.status(400).json({ message: 'Quantidade não informado.' });
  }
  return next();
};

module.exports = validateQuantityMiddleware;
