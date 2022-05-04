const { Router } = require('express');
const { homeController } = require('../controllers');

const routers = Router();

routers.get('/', homeController);

module.exports = routers;
