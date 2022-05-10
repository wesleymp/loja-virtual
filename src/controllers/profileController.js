const services = require('../services');

const profileController = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const userData = await services.profileService(authorization);
    return res.status(userData.status).json({ data: userData.data });
  } catch (error) {
    return next(error);
  }
};

module.exports = profileController;
