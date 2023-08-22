var express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const controller = require("../../controllers/profile.controller");

const { authJwt, resizePhoto } = require("../../middlewares");
var User = require("../../models/user.model");

const router = express.Router();

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // Only accept images
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});



router.get("/", authJwt.verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(400).json({ msg: "There is no Profile" });
      }
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


router.post(
    "/update",
    // console.log(req.body.name),
    authJwt.verifyToken,
    upload.single("avatar"),
    resizePhoto,
    controller.update
 
  );


module.exports = router;


