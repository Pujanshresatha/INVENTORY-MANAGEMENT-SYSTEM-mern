const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,  // Corrected this line to lowercase instead of lower
    required: [true, "Email is required"]
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"]
  }
}, { timestamps: true });

// Create model from the schema
const model = mongoose.model("User", Schema); // It's better to use the capitalized form "User" for model name
module.exports = model;
