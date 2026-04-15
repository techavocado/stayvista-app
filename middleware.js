const Listing = require("./models/listings.js")
const User = require("./models/users.js")
const {ListingSchema,reviewSchema} = require("./schema.js")
const ExpressError = require("./utils/ExpressError.js");

const validateListing = (req, res, next) => {
    //valdating form data using joi
    let { error } = ListingSchema.validate(req.body)

    if (error) {
        throw new ExpressError(400, error.details[0].message);
    } else {
        next()
    }
}

const validateReview = (req,res,next) =>{
    //valdating review data using joi
    let {error} = reviewSchema.validate(req.body)
    
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }else{
        next()
    }
}


const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};

const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl; // 🔥 cleanup
    }
    next();
};

const isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next(); 
};
module.exports = {
    isLoggedIn,
    saveRedirectUrl,
    isOwner,
    validateListing,
    validateReview
};


