const { string, required } = require("joi")
const mongoose = require("mongoose")
const { type, min } = require("../schema")

const reviewSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true,
        min: 1,
        max: 5
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

let review = mongoose.model("review",reviewSchema)

module.exports = review