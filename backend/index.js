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
    .populate({
      path: "orderItems",
      populate: { path: "lots", model: "Lot" },
    })
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
  const savedOrder = await newOrder.save();

  const objectToUpdate = [];
  req.body.orderItems.map((item) => {
    objectToUpdate.push({ _id: item._id, quantity: item.quantity });
  });

  let bulkArr = [];
  for (const i of objectToUpdate) {
    bulkArr.push({
      updateOne: {
        filter: { _id: mongoose.Types.ObjectId(i._id) },
        update: { $set: { quantity: i.quantity } },
      },
    });
  }
  Item.bulkWrite(bulkArr);

  res.send(savedOrder);
});

app.post("/api/item/new", async (req, res) => {
  let lotIds = [];
  req.body.lots.map((lot) => {
    lotIds.push(mongoose.Types.ObjectId(lot));
  });

  console.log(lotIds);
  let totalLots = 0;

  await Lot.find({ _id: { $in: lotIds } }, async (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      docs.forEach((doc) => {
        totalLots += doc.quantity;
      });
      
      const newItem = Item({
        name: req.body.name,
        quantity: req.body.quantity,
        lots: req.body.lots,
        totalLots: totalLots,
      });
      await newItem
        .save()
        .then((docs) => {
          res.json(docs);
        })
        .catch((err) => console.log(err));
    }
  });

  console.log(totalLots);
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
