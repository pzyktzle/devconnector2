// jwt strategy
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// db
const mongoose = require("mongoose");
const User = mongoose.model("users"); // load User model
// secrets or keys
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// pass through passport to use a strategy that looks for bearer tokens from Authorization header in requests
// decrypts the token, and finds and returns the user (if used as middleware for authentication)
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // user found
            return done(null, user);
          }
          // user not found
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
