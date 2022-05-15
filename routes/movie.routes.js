const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Movie = require("../models/Movie.model");

//isLoggedIn

router.get("/movie-random", isLoggedIn, (req, res, next) => {
    res.render("movies/movie-random");
});

router.get("/movie-detail", (req, res, next) => {
    res.render("movies/movie-detail");
});

router.get("/movies-list", isLoggedIn, (req, res, next) => {
    res.render("movies/movies-list");
});

router.get("/watch-list", isLoggedIn, (req, res, next) => {
    res.render("movies/watch-list");
});

module.exports = router;