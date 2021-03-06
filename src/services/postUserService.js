const models = require('../models');
const error = require('./helpers/error');
const { crypt } = require('./helpers/bcrypt');

const checkEmail = async (email) => {
  const userData = await models.getUserModel(email);
  if (userData.length > 0) {
    throw error(400, 'Email já está em uso.');
  }
};

const postUserService = async (name, password, email) => {
  await checkEmail(email);
  const passwordHash = crypt(password);
  await models.postUserModel(name, passwordHash, email);
  return { status: 201, message: 'Usuário registrado com sucesso!' };
};

module.exports = { postUserService, checkEmail };
