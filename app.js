// app.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/stewart-detailing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for your MongoDB collection
const UserSchema = new Schema({
  name: String,
  age: Number,
  car_make: String,
  car_model: String,
  car_year: Number,
});

// Create a Mongoose model based on the schema
const UserModel = mongoose.model("User", UserSchema);

// Example usage: Insert a document into the collection
const UserDocument = new UserModel({
  name: "John Doe",
  age: 25,
  car_make: "Mazda",
  car_model: "Rx-7",
  car_year: 1995,
});

UserDocument.save()
  .then((doc) => {
    console.log("Document saved:", doc);
  })
  .catch((error) => {
    console.error("Error saving document:", error);
  });
