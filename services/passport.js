const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    console.log(keys.googleClientID)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
passport.use(

    // GoogleStrategy vet att den ska söka efter strängen "google" när vi kör passport.authenticate
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            //findOne retunerar en Promise
            User.findOne({ googleID: profile.id }).then(existingUser => {
                if (existingUser) {
                    // this user exists in the db
                    done(null, existingUser);
                } else {
                    // make new user
                    new User({ googleID: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
        }
    )
);
