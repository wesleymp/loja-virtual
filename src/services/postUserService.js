const { postUserModel, getUserModel } = require('../models');
const error = require('./helpers/error');

const checkEmail = async (email) => {
  const { rowCount } = await getUserModel(email);
  if (rowCount > 0) {
    throw error(400, 'Email já está em uso.');
  }
};

const postUserService = async (name, password, email) => {
  await checkEmail(email);
  await postUserModel(name, password, email);
  return { status: 201, message: 'Usuário registrado com sucesso!' };
};

module.exports = postUserService;
