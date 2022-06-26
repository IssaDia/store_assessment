const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const LotSchema = new Schema({
  name: { type: String },
  quantity: Number,
});
const Lot = mongoose.model("Lot", LotSchema);

module.exports = Lot;
