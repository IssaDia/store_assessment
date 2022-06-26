const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.port || 8000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

let Item = require("./models/Item.js");
let Order = require("./models/Order.js");
let Lot = require("./models/Lot.js");

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/api/orders", async (req, res) => {
  await Order.find({})
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => console.log(err));
});

app.get("/api/items", async (req, res) => {
  await Item.find({})
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => console.log(err));
});

app.get("/api/lots", async (req, res) => {
  await Lot.find({})
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => console.log(err));
});

app.post("/api/order/new", async (req, res) => {
  const newOrder = Order(req.body);

  await newOrder
    .save()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => console.log(err));
});

app.post("/api/item/new", async (req, res) => {
  console.log(req.body.lots);
  const newItem = Item({
    name: req.body.name,
    quantity: req.body.quantity,
    lots: req.body.lots,
  });
  await newItem
    .save()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => console.log(err));
});

app.post("/api/lot/new", async (req, res) => {
  const newLot = Lot(req.body);
  await newLot
    .save()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => console.log(err));
});

app.put("/api/update/:id", async (req, res) => {
  const id = req.params.id;
  console.log("status", req.body.status);
  Order.findByIdAndUpdate(id, { status: req.body.status }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated User : ", docs);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
