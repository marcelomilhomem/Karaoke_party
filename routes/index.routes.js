const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
    const user = req.session.user;
    res.render("index", { user });
});

router.get("/profile", isLoggedIn, (req, res, next) => {
    const user = req.session.user;
    res.render("profile", { user });
});

module.exports = router;