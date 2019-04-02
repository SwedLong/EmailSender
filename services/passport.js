const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
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
        async (accessToken, refreshToken, profile, done) => {
            const { value: googlePhotoUrl } = profile.photos[0];
            console.log(googlePhotoUrl);

            //findOne retunerar en Promise
            const existingUser = await User.findOne({ googleID: profile.id });

            if (existingUser) {
                // this user exists in the db
                return done(null, existingUser);
            }
            // make new user
            const user = await new User({ googleID: profile.id, googlePhotoUrl: googlePhotoUrl }).save();
            done(null, user);
        }
    )
);
