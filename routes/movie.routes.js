const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { default: axios } = require("axios");
const Movie = require("../models/Movie.model");
const User = require("../models/User.model");
const { response } = require("../app");
/* const { response } = require("express"); */

//isLoggedIn
const getRandomMovie = async () => {
  try {
    let latest = await axios.get(
      `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.API_KEY}&language=en-US`
    );

    const randomId = Math.floor(Math.random() * latest.data.id);
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${randomId}?api_key=${process.env.API_KEY}&language=en-US`
    );

    let randomMovie = response.data;

    if (randomMovie.adult === true) {
      getRandomMovie();
    } else if (randomMovie.data) {
      getRandomMovie();
    } else {
      let videoResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${randomId}/videos?api_key=${process.env.API_KEY}&language=en-US`
      );
      let movieVideo = videoResponse.data.results[0];
      return { randomMovie, movieVideo };
    }
  } catch (error) {
      getRandomMovie();
  }
};

router.get("/movies/movie-search", (req, res, next) => {
  const user = req.session.user;
  const { title } = req.query;
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${title}`
    )
    .then((response) => {
      res.render("movies/search-movie", {
        movieList: response.data.results,
        user,
      });
    })
    .catch((err) => next(err));
});

router.get("/movies/movie-detail/:movieID", (req, res, next) => {
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

router.get("/movies/favourite-movies", (req, res, next) => {
  const user = req.session.user;

  User.findById(user._id)
    .populate("favourites")
    .then((user) => {
      res.render("movies/movies-list", { user });
    });
});

router.post("/movies/favourite-movies/:id", (req, res, next) => {
  const { id } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
    )
    .then((response) => {
      const movie = response.data;
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

router.get("/movies/watch-list", (req, res, next) => {
  const user = req.session.user;

  User.findById(user._id)
    .populate("watchList")
    .then((user) => {
      res.render("movies/watch-list", { user });
    });
});

router.post("/movies/watch-list/:id", (req, res, next) => {
  const { id } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
    )
    .then((response) => {
      const movie = response.data;
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

router.post("/movies/favourite-movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/"))
    .catch((err) => next(err));
});

router.get("/movies/up-coming", (req, res, next) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`
    )
    .then((response) => {
      res.render("movies/up-coming", { upComing: response.data.results });
    })
    .catch((err) => next(err));
});

router.get("/movies/random-movie", async (req, res, next) => {
  try {
    let randomMovie = await getRandomMovie();
    console.log(randomMovie);
    res.render("movies/movie-random", randomMovie);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;