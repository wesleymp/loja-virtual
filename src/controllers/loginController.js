const services = require('../services');

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userData = await services.loginService(email, password);
    return res.status(userData.status).json({ token: userData.token });
  } catch (error) {
    return next(error);
  }
};

module.exports = loginController;
