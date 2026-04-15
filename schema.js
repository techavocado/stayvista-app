const Joi = require("joi");
const review = require("./models/reviews");

const ListingSchema = Joi.object({

        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("",null),
        location: Joi.string().required(),
        price: Joi.number().min(0).required(),
        country: Joi.string().required()

});


const reviewSchema = Joi.object({

        review : Joi.object({
                rating: Joi.number().integer().min(1).max(5).required(),
                comment: Joi.string().required()

        }).required()
})

module.exports = {reviewSchema,ListingSchema}