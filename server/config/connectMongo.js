const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const DBString = process.env.DATABASE_URL;

mongoose
  .connect(DBString)
  .then(() => console.log("connected to Mongodb"))
  .catch((error) => console.log(error));

const database = mongoose.connection;

module.exports = database;
