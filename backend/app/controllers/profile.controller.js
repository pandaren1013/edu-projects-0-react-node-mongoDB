// const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

exports.update = async (req, res) => {
  try {
    if (req.file) {
      const user = await User.findByIdAndUpdate(
        req.userId,
        {
          username: req.body.username,
          location: req.body.location,
          website: req.body.website,
          company: req.body.company,
          phone: req.body.phone,
          birthday: req.body.birthday,
          avatar: req.file.filename,
          updatedAt: Date.now(),
        },
        { new: true }
      );
      res.status(200).json("successful operation",user);
    } else {
      const user = await User.findByIdAndUpdate(
        req.userId,
        {
          username: req.body.username,
          location: req.body.location,
          website: req.body.website,
          company: req.body.company,
          phone: req.body.phone,
          birthday: req.body.birthday,
          updatedAt: Date.now(),
        },
        { new: true }
      );
      await user.save();
      res.status(200).json("successful operation",user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};
