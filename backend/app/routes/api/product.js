var express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const controller = require("../../controllers/product.controller");
const { authJwt, resizePhoto } = require("../../middlewares");
var Product = require("../../models/product.model");
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
    const product = await Product.find();
    if (!product) {
      return res.status(404).json({ msg: "There is no Product" });
    }
    res.status(200).json("successful operation", product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/add",
  authJwt.verifyToken,
  upload.single("image"),
  controller.add
);
router.post(
  "/update",
  authJwt.verifyToken,
  upload.single("image"),
  controller.update
);

router.delete("/:id", authJwt.verifyToken, async (req, res) => {
  try {
    const productFound = await Product.findByIdAndDelete(req.params.id);
    if (!productFound) return res.status(204).json();
    return res.status(200).json("successful operation",productFound);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
