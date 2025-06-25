// models/employermodel.js
const mongoose = require('mongoose');

const seekerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Seeker', seekerSchema);
