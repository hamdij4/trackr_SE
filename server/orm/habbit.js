var mongoose = require("mongoose");

const HabbitSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: "No description provided."
  },
  type: {
    type: Number,
    required: true
  },
  points: {
    type: Number,
    required: false,
    default: 5
  },
  positive_count: {
    type: Number,
    required: false,
    default: 0
  },
  negative_count: {
    type: Number,
    required: false,
    default: 0
  }
});

const Habbit = (module.exports = mongoose.model("habbit", HabbitSchema, "habbit"));