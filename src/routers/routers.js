const { Router } = require('express');
const upload = require('../configs/multer');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const routers = Router();

routers.get('/', controllers.homeController);
routers.post(
  '/user',
  middlewares.validateNameMiddleware,
  middlewares.validatePasswordMiddleware,
  middlewares.validateEmailMiddleware,
  controllers.postUserController,
);
routers.post(
  '/login',
  middlewares.validateEmailMiddleware,
  controllers.loginController,
);
routers.post(
  '/product',
  middlewares.authMiddleware,
  middlewares.adminMiddleware,
  upload.single('image'),
  controllers.postProductController,
);
routers.post(
  '/management',
  middlewares.authMiddleware,
  middlewares.adminMiddleware,
  middlewares.validateIdMiddleware,
  middlewares.validateQuantityMiddleware,
  controllers.postManagementController,
);

module.exports = routers;
