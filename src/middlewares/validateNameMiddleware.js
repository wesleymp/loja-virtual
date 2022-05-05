const validateNameMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'Nome não informado.' });
  }
  if (name.length < 2) {
    return res.status(400).json({ message: 'Nome deve conter pelo menos 2 caracteres.' });
  }
  return next();
};

module.exports = validateNameMiddleware;
