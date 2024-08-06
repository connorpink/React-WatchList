const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../library/passwordUtils").genPassword;
const mongoConnection = require("../config/connectMongo");
const User = mongoConnection.models.user;
const users = require("../schemas/user");

// ------------ User Get Routes ------------

// takes 0 arguments from url

// route will:
//   return data for user that is currently logged in
router.get("/info", (req, res) => {
  console.log("user check");
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(401).json({ error: "user not signed in" });
  }
});

// ------------ User Post Routes ------------

// takes 2 arguments from body:
//   username, password: string

// route will:
//   use passport local strategy to verify {username} and {password} are correct
//   save user data in server
//   return error data or {message: "success"}

// if arguments are not provided:
//   username, password: login will fail and error will be returned
router.post("/login", (req, res, next) => {
  console.log("user/login post request received");

  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.log("error");
      return res.end(JSON.stringify(error));
    }
    if (!user) {
      console.log("no user");

      return res.end(JSON.stringify(info));
    }
    req.login(user, (error) => {
      if (error) {
        return res.end(error);
      } else {
        console.log("logged in");
        return res.end(JSON.stringify({ message: "success" }));
      }
    });
  })(req, res, next);
});

// takes 3 arguments from body:
//   username, email, password: string

// route will:
//   create a new user with data provided and save it in the database
//   save user data to server and log new user in to the account
//   if route fails to create new user, return {message: reason for failure}
//   if successful return {message: "success"}

// if arguments not provided:
//   username, email, password: route will fail to create new user
router.post("/register", async (req, res) => {
  //make sure no data is missing
  if (!req.body.username) {
    return res.status(400).json({ error: "no username provided" });
  }
  if (!req.body.email) {
    return res.status(400).json({ error: "no email provided" });
  }
  if (!req.body.password) {
    return res.status(400).json({ error: "no password provided" });
  }

  //check if username is available
  var result = await users.find({ username: req.body.username });
  if (result.length != 0) {
    return res.status(400).json({ error: "username already taken" });
  }

  // hash password
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  // create new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    TMDB_api_key: "",
    hash: hash,
    salt: salt,
  });

  // add new user to database
  newUser
    .save()

    // login new user
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

// takes 0 arguments from body

// route will:
//   logout current user
//   return error data or {message: "success"}
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

// takes account info arguments

//  route will:
//   patch account information for current user in database
//   return error data or {message:"success"}
router.patch("/updateAccount", (req, res) => {
  console.log("user/account patch request received");

  // save updated user
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

  // res.send(req.body);
});

//  route will:
//   Delete user from Database
router.delete("/delete", (req, res) => {
  console.log("user/delete request received");

  // save updated user
  users
    .deleteOne({ _id: req.user._id })
    .then((result) => console.log("delete result:", result))
    .catch((error) => console.error("Error deleting:", error));

  res.send(req.body);
});

module.exports = router;
