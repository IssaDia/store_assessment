const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");


const ProductSchema = new Schema({
    code: {
      type: String,
      default: shortid.generate,
    },
    name: String,
    quantity: Number,
  })
;

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
