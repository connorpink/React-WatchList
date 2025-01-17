const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema({
  movieId: Number,
  priority: Number,
  notes: String,
  title: String,
  release_date: Date,
  vote_average: Number,
  overview: String,
  poster_path: String,
  backdrop_path: String,
  owner: mongoose.SchemaTypes.ObjectId,
});

module.exports = mongoose.model("watchList", watchListSchema);
