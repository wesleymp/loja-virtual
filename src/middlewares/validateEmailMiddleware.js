const { isEmail } = require('validator');

const validateEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'Email não informado.' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ message: 'Email inválido.' });
  }
  return next();
};

module.exports = validateEmailMiddleware;
