const errorMiddleware = require('./errorMiddleware');
const validateNameMiddleware = require('./validateNameMiddleware');
const validatePasswordMiddleware = require('./validatePasswordMiddleware');

module.exports = {
  errorMiddleware,
  validateNameMiddleware,
  validatePasswordMiddleware,
};
