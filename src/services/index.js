const { postUserService, checkEmail } = require('./postUserService');
const loginService = require('./loginService');
const postProductService = require('./postProductService');
const postManagementService = require('./postManagementService');
const getManagementService = require('./getManagementService');

module.exports = {
  postUserService,
  checkEmail,
  loginService,
  postProductService,
  postManagementService,
  getManagementService,
};
