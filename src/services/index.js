const { postUserService, checkEmail } = require('./postUserService');
const loginService = require('./loginService');
const postProductService = require('./postProductService');
const postManagementService = require('./postManagementService');
const getManagementService = require('./getManagementService');
const getProductService = require('./getProductService');
const profileService = require('./profileService');

module.exports = {
  postUserService,
  checkEmail,
  loginService,
  postProductService,
  postManagementService,
  getManagementService,
  getProductService,
  profileService,
};
