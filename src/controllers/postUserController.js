const { postUserService } = require('../services');

const postUserController = async (req, res, next) => {
  const { name, password, email } = req.body;
  try {
    const userData = await postUserService(name, password, email);
    return res.status(userData.status).json({ message: userData.message });
  } catch (error) {
    return next(error);
  }
};

module.exports = postUserController;
