const { verifyToken } = require('../util/jwt');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado.' });
  }
  if (!verifyToken(authorization)) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
  return next();
};

module.exports = authMiddleware;
