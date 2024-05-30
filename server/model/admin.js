// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


const AdminModel = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
