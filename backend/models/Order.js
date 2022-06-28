const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const OrderSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  date: { type: Date, default: new Date() },
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      quantity: Number
    },
  ],
  status: { type: String, default: "Pending approval" },
  
});
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
