const express = require("express")
const router = express.Router()

const multer = require('multer');
const { storage } = require("../cloudConfig.js"); // Path check kar lena, agar routes folder ke bahar hai toh ../ lagega
const upload = multer({ storage });

const { ListingSchema, reviewSchema } = require("../schema.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing = require('../models/listings');
const review = require("../models/reviews.js");
const { isLoggedIn,isOwner } = require("../middleware.js");
const {validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js")



function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next)
    }
}

//listings route
router.get("/", asyncWrap(listingController.index))

//show route
router.get("/:id/show", asyncWrap(listingController.showListing))

//edit route
router.get("/:id/edit", isLoggedIn,isOwner, asyncWrap(listingController.EditListingPage))


router.route("/:id")
//edit listing patch route
.patch(isLoggedIn,isOwner,upload.single("listing[image]"), validateListing, asyncWrap(listingController.updateListing))
//delete  for listing and its associated reviews
.delete(isLoggedIn,isOwner, asyncWrap(listingController.deleteListing))


module.exports = router