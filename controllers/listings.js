const Listing = require('../models/listings');
const { isLoggedIn, isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js")

const axios = require('axios');
const mapToken = process.env.MAPTILER_API_KEY;

const { ListingSchema, reviewSchema } = require("../schema.js")
const ExpressError = require("../utils/ExpressError.js")
const review = require("../models/reviews.js");



module.exports.index = async (req, res) => {
    let { searchtitle } = req.query;
    console.log("Search query:", searchtitle);
    console.log(req.user)
    
    let dbQuery = {};
        if (searchtitle) {
        dbQuery.location = { $regex: searchtitle, $options: "i" };
    }
    
    let data = await Listing.find(dbQuery);    
    res.render("index.ejs", { data });
}

module.exports.showListing = async (req, res) => {
    let id = req.params.id
    //using populate to find data with reviews included
    let data = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner")
    console.log(data)
    if (!data) {
        req.flash("error", "listing you requested for does not exist")
        return res.redirect("/listings")
    }
    res.render("show.ejs", { data })
}

module.exports.EditListingPage = async (req, res) => {
    let id = req.params.id
    console.log(id)
    let data = await Listing.findById(id)
    if (!data) {
        req.flash("error", "listing you requested for does not exist")
        return res.redirect("/listings")
    }
    console.log(data)
    res.render("edit.ejs", { data })
}

module.exports.updateListing = async (req, res) => {
    let data = req.body
    let id = req.params.id
    let finddata = await Listing.findById(id)

    if (!finddata) {
        let message = "listing not found"
        return res.render("error.ejs", { message })
    }

    // --- 1. MapTiler API call  ---
    const maptilerUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(data.location)}.json?key=${process.env.MAPTILER_API_KEY}`; // ADDED
    const response = await axios.get(maptilerUrl); // ADDED

    let listing = await Listing.findByIdAndUpdate(id, {
        title: data.title,
        description: data.description,
        location: data.location,
        country: data.country,
        price: data.price,
        geometry: response.data.features[0].geometry 
    })

    if (typeof req.file !== "undefined") {
        let filename = req.file.filename;
        let url = req.file.path;
        listing.image = { url, filename };
        await listing.save()
    }

    req.flash("success", "Listing updated")
    res.redirect("/listings")
}

module.exports.deleteListing = async (req, res) => {
    let id = req.params.id
    let thislisting = await Listing.findById(id)

    await review.deleteMany({
        _id: { $in: thislisting.reviews }
    })

    await Listing.findByIdAndDelete(id)
    req.flash("success", "listing deleted successfully")
    res.redirect("/listings")

}