const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const LotSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  quantity : Number
});
const Lot = mongoose.model("Lot", LotSchema);

module.exports = Order;
