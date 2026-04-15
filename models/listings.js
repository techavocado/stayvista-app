const mongoose = require("mongoose")
const review = require("./reviews")


const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ87HIHJXbYe-aJixwCISLQ1OkGSF8K1FcOw&s"
        },
        filename: {
            type: String,
            default: "listingimage"
        }

    },
    price: Number,
    location: String,
    country: String,

    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review"
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // models/listings.js

    geometry: {
        type: {
            type: String,
            enum: ['Point'], // Sirf 'Point' hi store hoga
            required: true
        },
        coordinates: {
            type: [Number], // [Longitude, Latitude]
            required: true
        }
    }
})

const Listing = mongoose.model("Listing", ListingSchema)
module.exports = Listing

