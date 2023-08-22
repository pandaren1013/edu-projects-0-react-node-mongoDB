const sharp = require('sharp');
module.exports = function (req, res, next) {
    if (!req.file) return next();
  
    req.file.filename = `user-${Date.now()}.jpeg`;
  
    sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`public/images/users/${req.file.filename}`);  
    next();
  };