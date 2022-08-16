const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  rating: {
    required: true,
    type: Number,
  },
  netWeight: {
    required: true,
    type: Number,
  },
  grossWeight: {
    required: true,
    type: Number,
  },
  price: {
    required: true,
    type: Number,
  },
  discPrice: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("ProductsData", dataSchema);
