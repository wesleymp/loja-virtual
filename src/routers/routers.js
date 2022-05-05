const { Router } = require('express');
const {
  homeController,
  postUserController,
  loginController,
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
routers.post(
  '/login',
  validatePasswordMiddleware,
  validateEmailMiddleware,
  loginController,
);

module.exports = routers;
