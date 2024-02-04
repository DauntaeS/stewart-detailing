// app.js

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

// Define a schema for your MongoDB collection
const CustomerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  car_make: String,
  car_model: String,
  car_year: Number,
});

// Create a Mongoose model based on the schema
const CustomerModel = mongoose.model("Customer", CustomerSchema);

// API endpoint for creating a new customer
app.post("/api/new-customer", async (req, res) => {
  try {
    const newCustomer = new CustomerModel(req.body);
    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint for fetching all customers
app.get("/api/customers", async (req, res) => {
  try {
    const allCustomers = await CustomerModel.find();
    res.json(allCustomers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/update", async (req, res) => {
  try {
    const { name } = req.query;
    const updatedData = req.body;

    // Fetch all customers
    const allCustomers = await CustomerModel.find();

    // Filter customers by name
    const filteredCustomers = allCustomers.filter(
      (customer) => customer.name === name
    );

    if (filteredCustomers.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const updatedCustomer = filteredCustomers[0];

    Object.assign(customer, updatedData);

    await customer.save();

    res.json(customer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Additional API endpoints for updating and deleting customers can be added here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
