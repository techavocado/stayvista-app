const express = require("express")
const router = express.Router()
const ExpressError = require("../utils/ExpressError.js")
const Listing = require('../models/listings');
const review = require("../models/reviews.js");
const User = require("../models/users.js");
const passport = require("passport");
const storeRedirectUrl = require("../middleware.js");
const { saveRedirectUrl } = require("../middleware.js");

module.exports.getSignupPage = async (req, res) => {
     if(req.isAuthenticated()){
        req.flash("success","You are already logged in")
        return res.redirect("/listings")
    }
    res.render("signup.ejs")
}

module.exports.signUp = async (req, res,next) => {

    try {
        let data = req.body
        console.log(data)

        const newUser = new User({
            email: req.body.email,
            username: req.body.username
        })

        let registeredUser = await User.register(newUser, req.body.password)
        console.log(registeredUser)


        req.login(registeredUser,(err)=> {
        if (err) return next(err);
        req.flash("success", "signed up and logged in successfully");
        res.redirect("/listings");
    });

    } catch (error) {

        req.flash("error", error.message)
        res.redirect("/signup")
    }
}

module.exports.getLoginForm = async (req, res) => {
    if(req.isAuthenticated()){
        req.flash("success","you are already logged in")
        return res.redirect("/listings")
    }
    res.render("login.ejs")
}

module.exports.login = async (req, res) => {
        req.flash("success", "Welcome back!");

        // Case 1: Agar user kisi page se redirect hokar aaya hai (res.locals.redirectUrl)
        // Case 2: Agar user directly login karne aaya hai (Default: "/listings")
        let redirectUrl = res.locals.redirectUrl || "/listings"; 
        
        res.redirect(redirectUrl);
    }

module.exports.getLogoutPage = (req, res) => {

    if (!req.isAuthenticated()) {
        req.flash("error", "you are not logged in")
        return res.redirect("/login");
    }

    let username = req.user.username;
    let email = req.user.email;

    res.render("logout.ejs", { username, email });
}

module.exports.logOut = async (req, res) => {

    req.logout(function (err) {
        if (err) return next(err);

        req.flash("success", "User logged out");
        res.redirect("/listings");
    });

}

module.exports.getProfilePage = async (req, res) => {

    if (!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to view your profile")
        return res.redirect("/login");
    }
    let username = req.user.username;
    let email = req.user.email;
    res.render("profile.ejs", { username, email })
}