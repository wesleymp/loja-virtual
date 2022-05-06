const errorMiddleware = require('./errorMiddleware');
const validateNameMiddleware = require('./validateNameMiddleware');
const validatePasswordMiddleware = require('./validatePasswordMiddleware');
const validateEmailMiddleware = require('./validateEmailMiddleware');
const authMiddleware = require('./authMiddleware');
const adminMiddleware = require('./adminMiddleware');

module.exports = {
  errorMiddleware,
  validateNameMiddleware,
  validatePasswordMiddleware,
  validateEmailMiddleware,
  authMiddleware,
  adminMiddleware,
};
