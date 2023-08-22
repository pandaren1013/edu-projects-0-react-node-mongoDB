var express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const controller = require("../../controllers/product.controller");

const { authJwt, resizePhoto } = require("../../middlewares");
var Product = require("../../models/product.model");

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

// router.post("/add", authJwt.verifyToken, controller.add);
router.get("/", authJwt.verifyToken, async (req, res) => {
  try {
    const product = await Product.find();
    if (!product) {
      return res.status(400).json({ msg: "There is no Product" });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post(
  "/add",
  authJwt.verifyToken,
  upload.single("image"),
  resizePhoto,
  controller.add

);
router.post(
    "/update",
    // console.log(req.body.name),
    authJwt.verifyToken,
    upload.single("image"),
    resizePhoto,
    controller.update
 
  );


router.delete("/:id", authJwt.verifyToken, async (req, res) => {
  const productFound = await Product.findByIdAndDelete(req.params.id);
  if (!productFound) return res.status(204).json();
  return res.json(productFound);
});

//   router.delete("/:exp_id", authJwt.verifyToken, async (req, res) => {
//     try {
//       const product = await Product.findOne({ owner: req.user.id });

//       const removeIndex = product
//         .map((item) => item.id)
//         .indexOf(req.params.exp_id);

//         product.splice(removeIndex, 1);

//       await product.save();

//       res.json(product);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   });
//     try {
//         const product = Product.find();
//           if (!product) {
//             return res.status(400).json({ msg: "There is no Product" });
//           }else{
//             if(product==""){
//                 return res.status(200).json({msg:"success"});
//             }
//             else {res.json(product);}
//           }

//       } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//       }
//   });

module.exports = router;
