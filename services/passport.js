const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

passport.use(
    // GoogleStrategy vet att den ska söka efter strängen "google" när vi kör passport.authenticate
    new GoogleStrategy(
        {
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("access token", accessToken);
            console.log("refresh token", refreshToken);
            console.log("profile", profile);
        }
    )
);
