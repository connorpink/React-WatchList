const router = require("express").Router();
const passport = require("passport");

const mongoConnection = require("../config/connectMongo");
// const WatchList = mongoConnection.models.watchList;
const watchList = require("../schemas/watchList");

// returns a list of watchlist entries associated with the user
router.get("/list", async (req, res) => {
  try {
    const watchLists = await watchList
      .find({ owner: req.user._id })
      .sort({ priority: 1 });
    return res.status(200).json(watchLists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// adds a new watchList entry to the user's watchlist associated with a movieID
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

//update the notes and priority of a watchList entry for a movieID
router.patch("/update/:movieId", async (req, res) => {
  console.log("received patch request");
  const movieId = req.params.movieId;
  const priority = req.body.priority;
  const notes = req.body.notes;

  watchList
    .updateOne(
      { movieId: movieId, owner: req.user._id },
      { $set: { priority: priority, notes: notes } }
    )
    .then((result) =>
      res.send(JSON.stringify({ message: "success", result: result }))
    )
    .catch((error) =>
      res.status(500).json({ message: "Server Error", error: error })
    );
});

//delete a watchList entry for a movieID
router.delete("/delete/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  watchList
    .deleteOne({ owner: req.user._id, movieId: movieId })
    .then((result) =>
      res.send(JSON.stringify({ message: "success", result: result }))
    )
    .catch((error) =>
      res.status(500).json({ message: "Server Error", error: error })
    );
});
module.exports = router;
