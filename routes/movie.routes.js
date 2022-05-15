const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Movie = require("../models/Movie.model");
const { default: axios } = require("axios");
const { response } = require("express");

//isLoggedIn

router.get("movie-search", (req, res, next) => {
  const { name } = req.query;
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=bdb54a5f51e436feb6807b80aebf0c21&language=en-US&query=${name}`
    )
    .then((response) => {
      response.data.results.forEach((element) => {
        console.log(element.title);
      });
      res.render("search-movie", { movieList: response.data.results });
    })
    .catch((err) => next(err));
});

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
