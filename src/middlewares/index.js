const errorMiddleware = require('./errorMiddleware');
const validateNameMiddleware = require('./validateNameMiddleware');
const validatePasswordMiddleware = require('./validatePasswordMiddleware');
const validateEmailMiddleware = require('./validateEmailMiddleware');

module.exports = {
  errorMiddleware,
  validateNameMiddleware,
  validatePasswordMiddleware,
  validateEmailMiddleware,
};
