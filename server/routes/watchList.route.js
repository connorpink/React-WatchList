const router = require("express").Router();
const passport = require("passport");

const mongoConnection = require("../config/connectMongo");
const watchList = require("../schemas/watchList");

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

router.get("/status/:movieId", async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const watchLists = await watchList.find({ owner: req.user._id });

    const isOnWatchlist = watchLists.some(
      (watchList) => watchList.movieId.toString() === movieId
    );

    return res.status(200).json({ isOnWatchlist });
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

    const watchLists = await watchList.find({ owner: req.user._id });
    console.log(watchLists);

    const existingWatchListEntry = watchLists.find(
      (watchList) => watchList.movieId.toString() === movieId
    );
    if (existingWatchListEntry) {
      return res
        .status(200)
        .json({ message: "Movie already in your watch list" });
    }
    const movieTitle = req.body.movieTitle;
    const releaseDate = req.body.releaseDate;
    const rating = req.body.rating;
    const overview = req.body.overview;
    const posterPath = req.body.posterPath;
    const backdropPath = req.body.backdropPath;

    const newWatchListEntry = new watchList({
      owner: req.user._id,
      movieId: movieId,
      priority: 10,
      notes: "",
      title: movieTitle,
      release_date: releaseDate,
      vote_average: rating,
      overview: overview,
      poster_path: posterPath,
      backdrop_path: backdropPath,
    });
    await newWatchListEntry.save();

    return res.status(201).json({ message: "Movie added to your watch list" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

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

router.delete("/delete/:movieId", async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const entry = await watchList.findOne({
      owner: req.user._id,
      movieId: movieId,
    });
    if (!entry) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    const result = await watchList.deleteOne({
      owner: req.user._id,
      movieId: movieId,
    });
    res.send(
      JSON.stringify({
        message: `${entry.title} removed`,
        result: result,
      })
    );
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
});
module.exports = router;
