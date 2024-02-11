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
app.post("/api/create-customer", async (req, res) => {
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
app.get("/api/get-all-customers", async (req, res) => {
  try {
    const allCustomers = await CustomerModel.find();
    res.json(allCustomers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint for One customer
app.get("/api/get-customer", async (req, res) => {
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res
        .status(400)
        .json({ error: "customerId parameter is required" });
    }

    const getCustomer = await CustomerModel.findById(customerId);

    if (!getCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(getCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/update-customer", async (req, res) => {
  try {
    const { customerId } = req.body;
    const updatedData = req.body;

    if (!customerId) {
      return res
        .status(400)
        .json({ error: "customerId parameter is required" });
    }
    // Filter customers by ID
    const updatedCustomer = await CustomerModel.findById(customerId);

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    Object.assign(updatedCustomer, updatedData);

    await updatedCustomer.save();

    res.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/delete-customer", async (req, res) => {
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res
        .status(400)
        .json({ error: "customerId parameter is required" });
    }

    const deleteCustomer = await CustomerModel.findByIdAndDelete(customerId);

    if (!deleteCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Additional API endpoints for updating and deleting customers can be added here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
