const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: String,
    genre: [],
    description: String,
    rating: Number,
    cast: [],
    releaseYear: Number,
    image: String
});
const Movie = model("Movie", movieSchema);
module.exports = Movie;