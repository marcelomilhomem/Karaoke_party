const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.user;
  res.render("index", {user});
});

router.get("/profile", (req, res, next) => {
  res.render("profile"); 
});


module.exports = router;
