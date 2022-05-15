const { Schema, model } = require("mongoose");
const Movie = model("Movie", movieSchema);


const movieSchema = new Schema({
    title: String,
});

module.exports = Movie;