const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema({
  movieId: Number,
  // id: Number, // this is also movieId, used for movieCard components
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
