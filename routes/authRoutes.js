const passport = require("passport");
module.exports = app => {
    app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get("/auth/google/callback", passport.authenticate("google"));
    app.get("/", (req, res) => {
        res.send({ ok: "S" });
    });

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.send(req.user);
    });
    //passport sätter user objektet på req
    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
};
