const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  terrorLevel: {
    type: String,
    enum: ["leve", "medio", "pesado"],
    default: "medio",
  },
});

module.exports = mongoose.model("User", UserSchema);