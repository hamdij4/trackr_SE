var mongoose = require("mongoose");

//User schema

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: false,
    default: "No description provided by user."
  },
  birthday: {
    type: Date,
    required: false,
    default: Date.now()
  },
  points: {
    type: Number,
    required: false,
    default: 0
  }
});

const User = (module.exports = mongoose.model("user", UserSchema, "user"));