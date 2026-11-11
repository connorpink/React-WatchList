const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../library/passwordUtils").genPassword;
const mongoConnection = require("../config/connectMongo");
const User = mongoConnection.models.user;
const users = require("../schemas/user");
const watchList = require("../schemas/watchList");

router.get("/info", (req, res) => {
  console.log("user check");
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(401).json({ error: "user not signed in" });
  }
});

router.post("/login", (req, res, next) => {
  console.log("user/login post request received");

  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.end(JSON.stringify(error));
    }
    if (!user) {
      return res.end(JSON.stringify(info));
    }
    req.login(user, (error) => {
      if (error) {
        return res.end(error);
      } else {
        return res.end(JSON.stringify({ message: "success" }));
      }
    });
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ error: "no username provided" });
  }
  if (!req.body.email) {
    return res.status(400).json({ error: "no email provided" });
  }
  if (!req.body.password) {
    return res.status(400).json({ error: "no password provided" });
  }

  var result = await users.find({ username: req.body.username });
  if (result.length != 0) {
    return res.status(400).json({ error: "username already taken" });
  }

  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // New accounts share the demo key so visitors can try the site without signing up for TMDB.
    TMDB_api_key: process.env.TMDB_DEFAULT_KEY,
    hash: hash,
    salt: salt,
  });

  newUser
    .save()
    .then((user) => {
      req.login(user, (error) => {
        if (error) {
          res.end(error);
        } else {
          res.status(201).json({ message: "success" });
        }
      });
    });
});

router.post("/logout", (req, res) => {
  console.log("user/logout post request received");
  req.logout((error) => {
    if (error) {
      res.end(error);
    } else {
      res.end(JSON.stringify({ message: "success" }));
    }
  });
});

router.patch("/updateAccount", (req, res) => {
  console.log("user/account patch request received");

  users
    .updateOne(
      { _id: req.user._id },
      {
        $set: {
          TMDB_api_key: req.body.TMDB_api_key,
          email: req.body.email,
          username: req.body.username,
        },
      }
    )
    .then((result) =>
      res.send(JSON.stringify({ message: "success", result: result }))
    )
    .catch((error) => console.error("Error updating:", error));

});

router.delete("/delete", (req, res) => {
  console.log("user/delete request received");

  watchList
    .deleteMany({ owner: req.user._id })
    .then((result) => {
      console.log("watchList delete result:", result);
    })
    .catch((error) =>
      res.status(400).send(
        JSON.stringify({
          message: "Error deleting watchlist",
          error,
        })
      )
    );
  users
    .deleteOne({ _id: req.user._id })
    .then((result) => {
      console.log("delete result:", result);
      res.end(JSON.stringify({ message: "success" }));
    })
    .catch((error) => res.end(JSON.stringify({ error })));
});

module.exports = router;
