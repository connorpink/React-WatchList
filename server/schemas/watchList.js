const mongoose = require("mongoose");

// all data imputed should be relevant to 1 gram
const watchListSchema = new mongoose.Schema({
  movieId: Number,
  priority: Number,
  notes: String,
  owner: mongoose.SchemaTypes.ObjectId,
});

module.exports = mongoose.model("watchList", watchListSchema);
