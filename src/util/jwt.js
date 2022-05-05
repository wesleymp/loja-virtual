const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

const genereteJwt = (data) => {
  const token = sign(
    data,
    process.env.SECRET_KEY,
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
  );
  return token;
};

const verifyToken = (token) => {
  const decodeToken = verify(
    token,
    process.env.SECRET_KEY,
    (_err, decoded) => decoded,
  );
  return decodeToken;
};

module.exports = {
  genereteJwt,
  verifyToken,
};
