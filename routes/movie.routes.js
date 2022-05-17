const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { default: axios } = require("axios");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");
const { response } = require("../app");
/* const { response } = require("express"); */

//isLoggedIn

router.get("/movie-search", (req, res, next) => {
    const { title } = req.query;
    axios
        .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${title}`
        )
        .then((response) => {
            res.render("movies/search-movie", { movieList: response.data.results });
        })
        .catch((err) => next(err));
});

router.get("/movie-detail/:movieID", (req, res, next) => {
    const { movieID } = req.params;
    axios
        .get(
            `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.API_KEY}&language=en-US`
        )
        .then((response) => {
            const movieDetail = response.data;
            return axios
                .get(
                    `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${process.env.API_KEY}&language=en-US`
                )
                .then((response) => {
                    const movieVideo = response.data.results[0].key;
                    res.render("movies/movie-detail", { movieDetail, movieVideo });
                })
                .catch((err) => next(err));
        });
});

//Criar rota para favoritos e nest post router fazer redirect para esta rota;
//hbs fazer for each pelos favoritos
//

router.get("/favourites", (req, res, next) => {
    const user = req.session.user;

    User.findById(user._id)
        .populate("favourites")
        .then((user) => {
            console.log(user);
            res.render("movies/movies-list", { user });
        });
});

router.post("/favourite-movies/:id", (req, res, next) => {
    console.log(req.body);
    const { id } = req.params;
    axios
        .get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
        )
        .then((response) => {
            const movie = response.data;
            console.log(movie);
            Movie.create({
                    title: movie.original_title,
                    image: movie.poster_path,
                })
                .then((newMovie) => {
                    User.findByIdAndUpdate(req.session.user._id, {
                        $push: { favourites: newMovie.id },
                    }).then(() => {
                        res.redirect("/");
                    });
                })
                .catch((err) => next(err));
        });
});

router.get("/watch-list", (req, res, next) => {
    const user = req.session.user;

    User.findById(user._id)
        .populate("watchList")
        .then((user) => {
            console.log(user);
            res.render("movies/watch-list", { user });
        });
});

router.post("/watch-list/:id", (req, res, next) => {
    console.log(req.body);
    const { id } = req.params;
    axios
        .get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
        )
        .then((response) => {
            const movie = response.data;
            console.log(movie);
            Movie.create({
                    title: movie.original_title,
                    image: movie.poster_path,
                })
                .then((newMovie) => {
                    User.findByIdAndUpdate(req.session.user._id, {
                        $push: { watchList: newMovie.id },
                    }).then(() => {
                        res.redirect("/");
                    });
                })
                .catch((err) => next(err));
        });
});

router.get("/movie-random", isLoggedIn, (req, res, next) => {
    res.render("movies/movie-random");
});

module.exports = router;