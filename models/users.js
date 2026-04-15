const mongoose = require("mongoose")

let passportLocalMongoose = require("passport-local-mongoose")

// 🔥 FORCE FIX
if (typeof passportLocalMongoose !== "function") {
    passportLocalMongoose = passportLocalMongoose.default
}

console.log("TYPE:", typeof passportLocalMongoose) // debug

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema)

module.exports = User
