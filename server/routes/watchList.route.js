const router = require("express").Router();
const passport = require("passport");

const mongoConnection = require("../config/connectMongo");
// const WatchList = mongoConnection.models.watchList;
const watchList = require("../schemas/watchList");

router.get("/list", async (req, res) => {
  try {
    const watchLists = await watchList.find({ owner: req.user._id });
    return res.status(200).json(watchLists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.put("/add/:movieId", async (req, res) => {
  try {
    const movieId = req.params.movieId;

    if (!watchList) {
      console.error("WatchList model not defined");
      return res.status(500).json({ message: "Server Error" });
    }

    // Find the user's existing watch list entries
    const watchLists = await watchList.find({ owner: req.user._id });
    console.log(watchLists);

    // Check if the movie is already in their watch list
    const existingWatchListEntry = watchLists.find(
      (watchList) => watchList.movieId.toString() === movieId
    );
    if (existingWatchListEntry) {
      return res
        .status(200)
        .json({ message: "Movie already in your watch list" });
    }

    // Create a new WatchList entry
    const newWatchListEntry = new watchList({
      owner: req.user._id,
      movieId: movieId,
      priority: 10, // Initialize rating to 0
      notes: "", // Initialize description as empty string
    });
    await newWatchListEntry.save();

    return res.status(201).json({ message: "Movie added to your watch list" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
