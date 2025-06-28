const mongoose = require("mongoose");

const seekerSchema = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  age: { type: Number },
  location: { type: String },
  linkedin: { type: String },
  bio: { type: String },
});

module.exports = mongoose.model("Seeker", seekerSchema);
