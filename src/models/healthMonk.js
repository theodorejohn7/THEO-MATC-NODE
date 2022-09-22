const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
  },
  date: {
    required: true,
    type: String,
  },
  time: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  steps: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("healthMonk", dataSchema);
