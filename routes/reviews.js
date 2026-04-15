const express = require("express")
const router = express.Router({ mergeParams: true })

const { ListingSchema, reviewSchema } = require("../schema.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing = require('../models/listings');
const review = require("../models/reviews.js");
const { validateReview, isLoggedIn } = require("../middleware.js")
const User = require("../models/users.js")
const reviewController = require("../controllers/reviews.js")




function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next)
    }
}


router.post("/", isLoggedIn, validateReview, asyncWrap(reviewController.postReview))


router.delete("/:reviewid/delete", isLoggedIn, asyncWrap(reviewController.deleteReview))



module.exports = router