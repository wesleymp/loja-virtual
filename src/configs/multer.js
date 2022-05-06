const multer = require('multer');

const storageProduct = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'public/images/products/'),
  filename: (_req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage: storageProduct });

module.exports = upload;
