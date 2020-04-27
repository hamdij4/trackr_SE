var mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
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
  points: {
    type: Number,
    required: true,
    default: 5
  },
  project: {
    type: String,
    required: false,
    default: "Not in any project"
  },
  finished: {
    type: Boolean,
    required: false,
    default: false
  },
  due: {
    type: Date,
    required: false
  }
});

const Task = (module.exports = mongoose.model("task", TaskSchema, "task"));