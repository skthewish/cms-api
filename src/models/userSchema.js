const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "invalid email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  registeredClass: [
    {
      type: String,
    },
  ],
  token: {
    type: String,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
