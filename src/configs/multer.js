const multer = require('multer');
const path = require('path');

const storageProduct = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, path.join(__dirname, '..', '..', 'public', 'images', 'products')),
  filename: (_req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage: storageProduct });

module.exports = upload;
