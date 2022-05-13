const models = require('../models');
const { verifyToken } = require('../util/jwt');

const profileService = async (authorization) => {
  const data = verifyToken(authorization);
  const userProfile = await models.profileModel(data.id_user);
  delete userProfile[0].password;
  return { status: 200, data: userProfile[0] };
};

module.exports = profileService;
