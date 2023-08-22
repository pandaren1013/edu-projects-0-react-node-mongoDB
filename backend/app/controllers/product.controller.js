// const config = require("../config/auth.config");
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
  res.json(product);

};

exports.update =async (req, res) => {
    if(req.file){
        const product = await Product.findByIdAndUpdate(req.body._id,{
            name: req.body.name,
          description: req.body.description,
          image: req.file.filename,
          price: req.body.price,
        })
        console.log(req.body);
        product.save();
        res.json(product);
      } else {
        const product = await Product.findByIdAndUpdate(req.body._id,{
            name: req.body.name,
          description: req.body.description,
          
          price: req.body.price,
        })
        console.log(req.body);
        product.save();
        res.json(product);
      };
    } 

// exports.delete = (req, res) => {
//     const product = Product.findOne({
//       name: req.body.name,
//       description: req.body.description,
//       image: req.body.image,
//       price: req.body.price,
//       owner: req.userId,
//     });
    
//     product.save();
//     res.send(product);
  
//   };

