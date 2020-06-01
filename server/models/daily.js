var mongoose = require("mongoose");

const DailySchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: "No description provided."
  },
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: false,
    default: 0
  },
  done: {
    type: Boolean,
    required: false,
    default: false
  },
  points: {
    type: Number,
    required: false,
    default: 5
  },
  archived: {
    type: Boolean,
    required: false,
    default: false
  },
  finished:{
    type: Date, 
    required: false
  }
});

const Daily = (module.exports = mongoose.model("daily", DailySchema, "daily"));