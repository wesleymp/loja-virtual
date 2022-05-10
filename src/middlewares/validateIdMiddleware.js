const validateIdMiddleware = (req, res, next) => {
  const { id } = req.body;
  if (!id || id === '') {
    return res.status(400).json({ message: 'Id não informado.' });
  }
  return next();
};

module.exports = validateIdMiddleware;
