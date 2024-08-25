const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  userName: { type: String, require: true },
  serverID: { type: String, require: true },
  creepma: { type: Number, default: 500 },
  bank: { type: Number },
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;