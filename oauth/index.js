
const passport = require("passport");
const FacebookStrategy = require("./facebook");
console.log(FacebookStrategy)
passport.use("facebook", FacebookStrategy);
// you can add more plugins here

module.exports = passport;