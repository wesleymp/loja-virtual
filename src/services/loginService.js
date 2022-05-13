const models = require('../models');
const error = require('./helpers/error');
const { genereteJwt } = require('../util/jwt');
const { compare } = require('./helpers/bcrypt');

const loginService = async (email, password) => {
  const userData = await models.getUserModel(email);
  if (userData.length === 0 || !compare(password, userData[0].password)) {
    throw error(400, 'Email ou Senha incorretos.');
  }
  return {
    status: 200,
    token: genereteJwt({ id_user: userData[0].id_user, id_role: userData[0].id_role }),
  };
};

module.exports = loginService;
