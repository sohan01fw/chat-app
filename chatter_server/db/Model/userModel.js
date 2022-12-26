const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  AvatarImage: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
