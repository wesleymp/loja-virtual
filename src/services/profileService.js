const models = require('../models');
const { verifyToken } = require('../util/jwt');

const profileService = async (authorization) => {
  const data = verifyToken(authorization);
  const { rows } = await models.profileModel(data.id_user);
  delete rows[0].password;
  return { status: 200, data: rows[0] };
};

module.exports = profileService;
