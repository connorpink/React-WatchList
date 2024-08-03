const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  TMDB_api_key: String,
  hash: { type: String, select: false },
  salt: { type: String, select: false },
  watch_list: {
    type: [{ type: mongoose.SchemaTypes.ObjectId }],
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
