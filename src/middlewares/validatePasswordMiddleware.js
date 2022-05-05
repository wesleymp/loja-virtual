const validatePasswordMiddleware = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'Senha não informada.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Senha deve conter pelo menos 6 caracteres.' });
  }
  return next();
};

module.exports = validatePasswordMiddleware;
