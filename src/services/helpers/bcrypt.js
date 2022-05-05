const bcrypt = require('bcrypt');

const crypt = (string) => bcrypt.hashSync(string, 10);

const compare = (string, hash) => bcrypt.compareSync(string, hash);

module.exports = {
  crypt,
  compare,
};
