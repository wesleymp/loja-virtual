const { Router } = require('express');
const upload = require('../configs/multer');

const {
  homeController,
  postUserController,
  loginController,
  postProductController,
} = require('../controllers');
const {
  validateNameMiddleware,
  validatePasswordMiddleware,
  validateEmailMiddleware,
  authMiddleware,
  adminMiddleware,
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
  validateEmailMiddleware,
  loginController,
);
routers.post(
  '/product',
  adminMiddleware,
  authMiddleware,
  upload.single('image'),
  postProductController,
);

module.exports = routers;
