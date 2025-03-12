const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  department: { type: String },
  location: { type: String },
  level: { type: String },
});

module.exports = mongoose.model("Candidate", candidateSchema);
