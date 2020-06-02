var mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    creator: {
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
      users: {
        type: Array,
        required: false,
        default: []
      },
      tasks: {
        type: Array,
        required: false,
        default: []
      },
      due: {
        type: Date,
        required: false
      }
    });

const Project = (module.exports = mongoose.model("project", ProjectSchema, "project"));