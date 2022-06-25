const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.port || 8000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

let Product = require("./models/Product.js")
let Order = require("./models/Order.js");

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({})
  res.send(orders);
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/order/new", async (req, res) => {
  const newOrder = Order(req.body);
  console.log(newOrder);
  const savedOrder = await newOrder.save()
  res.send(savedOrder);
});

app.post("/api/product/new", async (req, res) => {
  const newProduct = Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
