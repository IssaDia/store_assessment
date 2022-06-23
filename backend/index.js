const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.port || 8000;
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const shortid = require("shortid");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const Schema = mongoose.Schema;

const Order = mongoose.model(
  "order",
  new Schema({
    _id: {
      type: String,
      default: shortid.generate,
    },
    date: Date,
    Status: String,
    orderItems: [String],
  })
);

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({})
  res.send(orders);
});

app.post("/api/orders", async (req, res) => {
  const newOrder =  Product(req.body);
  const savedOrder = await newOrder.save()
  res.send(savedOrder);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
