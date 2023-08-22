// const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

exports.update = async (req, res) => {
  if (req.file) {
    const user = await User.findByIdAndUpdate(req.userId, {
      username: req.body.username,
      location: req.body.location,
      website: req.body.website,
      company: req.body.company,
      phone: req.body.phone,
      birthday: req.body.birthday,
      avatar: req.file.filename,
      updatedAt: Date.now(),
    });
    // console.log(req.body);
    user.save();
    res.json(user);
  } else {
    const user = await User.findByIdAndUpdate(req.userId, {
      username: req.body.username,
      location: req.body.location,
      website: req.body.website,
      company: req.body.company,
      phone: req.body.phone,
      birthday: req.body.birthday,
      updatedAt: Date.now(),

      // avatar: req.file.filename,
    });
    // console.log(req.body);
    user.save();
    res.json(user);
  }
};