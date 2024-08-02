//index.js

const mongoose = require("mongoose");
const mongoConnection = require("./config/connectMongo");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const cors = require("cors");

//setup server
const app = express();
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json());
app.use(flash());

require("dotenv").config();
const DBString = process.env.DATABASE_URL;
app.use(
  session({
    secret: "figure this out later",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongooseConnection: mongoConnection,
      collection: "session",
      mongoUrl: DBString,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // expires after 24 hours
    },
  })
);
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;

  const now = new Date();
  const offset = -4;
  const gmt4Time = new Date(now.getTime() + offset * 60 * 60 * 1000);
  const formattedTime = gmt4Time
    .toISOString()
    .replace("T", " ")
    .substring(0, 19);

  // log some general information to console for debugging
  console.log("\n\n\n\n\n");
  console.log("\x1b[31m%s\x1b[0m", "CALL TO SERVER RECEIVED!");

  console.log();
  console.log("time of request: " + "\x1b[35m%s\x1b[0m", formattedTime);
  console.log("active session:", !!req.session);
  console.log("active user:", !!req.user);
  if (req.user) {
    console.log("   username = " + "\x1b[32m%s\x1b[0m", req.user.username);
    console.log("        _id =", req.user._id);
  }
  console.log("requested url: " + "\x1b[36m%s\x1b[0m", req.url);
  console.log("requested method: " + "\x1b[36m%s\x1b[0m", req.method);
  console.log();

  next();
});

app.use("/server", (req, res, next) => {
  console.log("request made from client");
  next();
});

// require("dotenv").config();

// const DBString = process.env.DATABASE_URL;
// mongoose.connect(DBString);
// const database = mongoose.connection;

// database.on("error", (error) => {
//   console.log(error);
// });

// database.once("connected", () => {
//   console.log("Database Connected");
// });

app.get("/", (req, res) => {
  res.send("Hello from our server!");
});

const usersRouter = require("./routes/user.route");
app.use("/user", usersRouter);

// const projectRouter = require("./routes/project.route");
// app.use("/project", projectRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
