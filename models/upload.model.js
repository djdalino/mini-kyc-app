const mongoose = require("mongoose");
const uploadSchema = new mongoose.Schema({
  upload: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Upload", uploadSchema);
