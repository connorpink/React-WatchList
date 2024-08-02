const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  bio: String,
  hash: { type: String, select: false },
  salt: { type: String, select: false },
  projects: {
    type: [{ type: mongoose.SchemaTypes.ObjectId }],
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
