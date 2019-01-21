if (process.env.NODE_ENV === "production") {
    //we are in production require in the prd set of keys
    module.exports = "./prod";
} else {
    //we are in dev return the dev keys
    module.exports = require("./dev");
}
