const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: "https://pbs.twimg.com/profile_images/990093841632903168/JpEYo8qH_400x400.jpg",
    },
    favourites: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    watchList: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
}, {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
});

const User = model("User", userSchema);

module.exports = User;