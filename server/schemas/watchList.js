const mongoose = require("mongoose");

// all data imputed should be relevant to 1 gram
const projectSchema = new mongoose.Schema({
  name: String,
  link: String,
  description: String,
  public: Boolean,
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("project", projectSchema);
