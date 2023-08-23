var express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const controller = require("../../controllers/profile.controller");

const { authJwt, avatar } = require("../../middlewares");
var User = require("../../models/user.model");

const router = express.Router();

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   // Only accept images
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image! Please upload only images.", 400), false);
//   }
// };
const path = require('path');
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/users');
    },
    filename: (req, file, cb) => {
     
     cb(null, `image-${Date.now()}` + path.extname(file.originalname))
        //path.extname get the uploaded file extension
    }
  });
  const multerFilter = (req, file, cb) => {
     
          if (!file.originalname.match(/\.(png|jpg|svg)$/)) { 
               // upload only png and jpg format
             return cb(new Error('Image type not correct. png, jpg,svg'))
           }
         cb(null, true)
      
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
    // avatar,
    controller.update
 
  );


module.exports = router;


