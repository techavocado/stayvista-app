const express = require("express")
const router = express.Router()
const ExpressError = require("../utils/ExpressError.js")
const Listing = require('../models/listings');
const review = require("../models/reviews.js");
const User = require("../models/users.js");
const passport = require("passport");
const storeRedirectUrl = require("../middleware.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js")


function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next)
    }
}

router.route("/signup")
.get(asyncWrap(userController.getSignupPage))
.post(asyncWrap(userController.signUp))

router.route("/login")
.get( asyncWrap(userController.getLoginForm))
.post(saveRedirectUrl, 
    passport.authenticate("local", { 
        failureRedirect: "/login", 
        failureFlash: true 
    }), 
    asyncWrap(userController.login)
);

router.route("/logout")
.get(userController.getLogoutPage)
.post(asyncWrap(userController.logOut))

router.get("/profile", asyncWrap(userController.getProfilePage))

module.exports = router

