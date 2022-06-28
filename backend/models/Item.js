const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const ItemSchema = new Schema({
  code: {
    type: String,
    default: shortid.generate,
  },
  name: String,
  quantity : Number,
  lots: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lot",
    },
  ],
});
const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
