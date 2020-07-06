const strategy = require("passport-facebook");
const FacebookStrategy = strategy.Strategy;
require("dotenv").config()
module.exports = new FacebookStrategy(
  // 1st arg is configuration
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ["id", "email", "name"]
  },
  // verification function (callback)
  function(accessToken, refreshToken, profile, next) {
    console.log(profile);
    next(null, profile);
  }
);