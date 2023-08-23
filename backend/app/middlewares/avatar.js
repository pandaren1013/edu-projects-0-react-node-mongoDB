const sharp = require('sharp');
module.exports = function (req, res, next) {
    if (!req.file) return next();
  
    // req.file.filename = `user-${Date.now()}.jpeg`;
    req.file.filename = `user-${req.body.username}.png`;
  
    sharp(req.file.buffer)
      .resize(600, 600)
      // .toFormat("png")
      // .png({ quality: 80 })
      .toFile(`public/images/users/${req.file.filename}`);  
    next();
  };