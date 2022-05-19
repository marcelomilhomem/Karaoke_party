const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/:id/edit", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then((user) => res.render("user/user-edit", user))
        .catch((err) => next(err));
});

router.post(
    "/:id/edit",
    fileUploader.single("userImage"),
    isLoggedIn,
    (req, res, next) => {
        const { id } = req.params;
        const { username, password } = req.body;
        //    console.log(req.file);
        if (req.file) {
            return User.findByIdAndUpdate(
                    id, {
                        username,
                        password,
                        imageUrl: req.file.path,
                    }, { new: true }
                )
                .then((updatedUser) => {
                    req.session.user = updatedUser;
                    res.redirect("/profile");
                })
                .catch((err) => next(err));
        } else {
            return User.findByIdAndUpdate(id, { username, password }, { new: true })
                .then((updatedUser) => {
                    req.session.user = updatedUser;
                    console.log(updatedUser);
                    res.redirect("/profile");
                })
                .catch((err) => next(err));
        }
    }
);
router.post("/:id/delete", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    req.app.locals.currentUser = null;
    req.session.destroy();
    User.findByIdAndRemove(id)
        .then(() => res.redirect("/"))
        .catch((err) => next(err));
});

module.exports = router;