// server.js (Node.js/Express)

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/stewart-detailing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Mongoose model (similar to the one in the previous example)
const CustomerModel = mongoose.model("Customer", {
  name: String,
  age: Number,
  car_make: String,
  car_model: String,
  car_year: Number,
});

// API endpoint for creating an item
app.post("/api/new-customer", async (req, res) => {
  try {
    const newItem = new CustomerModel(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
