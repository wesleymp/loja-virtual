const { verifyToken } = require('../util/jwt');

const adminMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const jwtData = verifyToken(authorization);
  if (jwtData.id_role !== 1) {
    return res.status(403).json({ message: 'Você não tem permissão para acessar está rota.' });
  }
  return next();
};

module.exports = adminMiddleware;
