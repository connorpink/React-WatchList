const express = require("express");
const router = express.Router();
const mongoConnection = require("../config/connectMongo");

const WatchList = mongoConnection.models.watchList;
const watchList = require("../schemas/watchList");

router.get("/", async (req, res) => {
  try {
    const watchLists = await WatchList.find();
    return res.status(200).json({ watchLists });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
