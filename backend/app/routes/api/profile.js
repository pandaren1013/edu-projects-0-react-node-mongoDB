var express = require("express");
const multer = require("multer");
const controller = require("../../controllers/profile.controller");
const { authJwt } = require("../../middlewares");
var User = require("../../models/user.model");
const router = express.Router();
const path = require("path");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/users");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}` + path.extname(file.originalname));
  },
});

const multerFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|svg)$/)) {
    // upload only png and jpg format
    return cb(new Error("Image type not correct. png, jpg,svg"));
  }
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


router.get("/", authJwt.verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "There is no Profile" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/update",
  authJwt.verifyToken,
  upload.single("avatar"),
  controller.update
);

module.exports = router;
