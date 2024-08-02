const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./connectMongo");
const User = require("../schemas/user");
const validPassword = require("../library/passwordUtils").validPassword;

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .select("+hash +salt")
    .then((user) => {
      if (!user) {
        return done(null, false, { message: "badUser" });
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        delete user.hash;
        delete user.salt;
        return done(null, user, { message: "authenticated" });
      } else {
        return done(null, false, { message: "badPass" });
      }
    })
    .catch((err) => {
      done(err);
    });
};

passport.use(new LocalStrategy(customFields, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
