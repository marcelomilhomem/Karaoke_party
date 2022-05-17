const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: String,
    image: String,
    genre: [{type: String}],
    description: String,
    rating: Number,
    cast: [{type: String}],
    releaseYear: Number,
});
const Movie = model("Movie", movieSchema);
module.exports = Movie;