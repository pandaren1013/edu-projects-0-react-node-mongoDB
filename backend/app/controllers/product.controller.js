const db = require("../models");
const Product = db.product;

exports.add = (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.file.filename,
    price: req.body.price,
    owner: req.userId,
  });
  product.save();
  res.status(200).json("successful operation", product);
};

exports.update = async (req, res) => {
  try {
    if (req.file) {
      const product = await Product.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        description: req.body.description,
        image: req.file.filename,
        price: req.body.price,
      });
      product.save();
      res.status(200).json("successful operation", product);
    } else {
      const product = await Product.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      });
      product.save();
      res.status(200).json("successful operation", product);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};
