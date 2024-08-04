const mongoose = require("mongoose");

// all data imputed should be relevant to 1 gram
const watchListSchema = new mongoose.Schema({
  movieName: String,
  linkToPoster: String,
  rating: Number,
  description: String,
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("project", projectSchema);
