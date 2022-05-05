const { Router } = require('express');
const {
  homeController,
  postUserController,
} = require('../controllers');
const {
  validateNameMiddleware,
  validatePasswordMiddleware,
  validateEmailMiddleware,
} = require('../middlewares');

const routers = Router();

routers.get('/', homeController);
routers.post(
  '/user',
  validateNameMiddleware,
  validatePasswordMiddleware,
  validateEmailMiddleware,
  postUserController,
);

module.exports = routers;
