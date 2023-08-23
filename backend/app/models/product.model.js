const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: String,
    description: String,
    image: String,
    price: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  });

module.exports = mongoose.model('Product', ProductSchema);

