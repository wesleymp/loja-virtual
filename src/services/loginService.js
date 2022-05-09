const models = require('../models');
const error = require('./helpers/error');
const { genereteJwt } = require('../util/jwt');
const { compare } = require('./helpers/bcrypt');

const loginService = async (email, password) => {
  const { rowCount, rows } = await models.getUserModel(email);
  if (rowCount === 0 || !compare(password, rows[0].password)) {
    throw error(400, 'Email ou Senha incorretos.');
  }
  return { status: 200, token: genereteJwt({ id: rows[0].id, id_role: rows[0].id_role }) };
};

module.exports = loginService;
