const express = require("express")
const ExpressError = require("../utils/ExpressError.js")
const { ListingSchema, reviewSchema } = require("../schema.js")
const Listing = require('../models/listings');
const review = require("../models/reviews.js");
const User = require("../models/users.js")

module.exports.postReview = async (req, res) => {

    let data = req.body.review
    let id = req.params.id

    let listing = await Listing.findById(id)
    console.log(listing)

    let newReview = new review(data)
    newReview.author = req.user._id
    console.log(newReview)
    listing.reviews.push(newReview)

    await newReview.save()
    await listing.save()

    req.flash("success", "Review added successfully")
    res.redirect(`/listings/${id}/show`)
}


module.exports.deleteReview = async (req, res) => {
    let { id, reviewid } = req.params

    let currReview = await review.findById(reviewid)
    console.log(currReview.author)

    console.log(req.user._id)
    console.log(currReview.author._id)

    if (req.user && currReview.author.toString() === req.user._id.toString()) {
        let reviewData = await review.findByIdAndDelete(reviewid)
        let thislisting = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } })

        req.flash("success", "Review deleted successfully")
        res.redirect(`/listings/${id}/show`)
    }
    else {
        req.flash("error", "you are not the author of this review")
        res.redirect(`/listings/${id}/show`)
    }
}