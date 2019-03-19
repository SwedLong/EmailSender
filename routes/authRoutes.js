const passport = require("passport");
module.exports = app => {
    app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect("/surveys");
        }
    );

    app.get("/", (req, res) => {
        res.send({ message: "Welcome" });
    });

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    //passport sätter user objektet på req
    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
};
