const express = require('express');
const app = express();
//.env file!
// if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
// }
const axios = require('axios');
const mapToken = process.env.MAPTILER_API_KEY;

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const ExpressError = require("./utils/ExpressError.js")
const mongoose = require('mongoose');
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);


const session = require("express-session")
const MongoStore = require("connect-mongo").default;


const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/users.js")
const { isLoggedIn, saveRedirectUrl } = require("./middleware.js");
const multer  = require('multer');
const {storage} = require("./cloudConfig.js")
const upload = multer({ storage });
const dburl = process.env.ATLAS_DB_URL;


const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave :false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true 
    }

}

app.use(session(sessionOptions))
app.use(flash())


app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//flash middleware takes response from routes and stores success msg in res.locals
app.use((req,res,next)=>{
    res.locals.currUser = req.user;
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

//require the listing routes
const ListingRouter =require("./routes/listing.js")
//require review routes
const ReviewRouter =require("./routes/reviews.js")

const UserRouter =require("./routes/user.js")

//requiring joi schema
const { ListingSchema, reviewSchema } = require("./schema.js")

//for handling api post requests from postman
app.use(express.json());


async function main() {
    await mongoose.connect(dburl);
}

const Listing = require('./models/listings');
const review = require("./models/reviews.js");
const { rmSync } = require('fs');

main().then((res) => {
    console.log("connection established")
})
    .catch((err) => {
        console.log(err)
    })

let port = 8080

app.listen(port, () => {
    console.log(`"server is running on port ${port}"`)
})

//logger middleware

// app.use((req, res, next) => {
//     let responsetime = Date()
//     console.log(req.method, req.path, responsetime, req.hostname)
//     next()
// })






//wrapasync function

function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next)
    }
}

const validateListing = (req,res,next) =>{
    //valdating form data using joi
    let {error} = ListingSchema.validate(req.body)
    
    if (error) {
        throw new ExpressError(400, error.details[0].message);
    }else{
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
  


app.get("/test", (req,res)=>{
    console.log("TEST HIT")
    res.send("test working")
})

app.get("/demouser",async(req,res)=>{

     console.log("DEMO USER ROUTE HIT")
    const newUser = new User({
        email: "demouser@gmail.com",
        username: "demouser123"
    })

    let registeredUser = await User.register(newUser,"demouser@password2")
    res.send(registeredUser)
})

//map all the routes matching with listing with the required listing
app.use("/listings", ListingRouter);
app.use("/listings/:id/reviews", ReviewRouter);


app.get("/", (req, res) => {
    res.redirect("/listings");
});
app.use("/", UserRouter);

app.get("/create",isLoggedIn, async (req, res) => {
    res.render("create.ejs")
})

app.post("/create",upload.single("listing[image]"), isLoggedIn, validateListing, asyncWrap(async (req, res) => {
    let data = req.body;

    // 1. MapTiler Call (Ahmedabad wala logic)
    const maptilerUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(data.location)}.json?key=${mapToken}`;
    const response = await axios.get(maptilerUrl);
    

    let obj = {
        title: data.title,
        description: data.description,
        location: data.location,
        country: data.country,
        price: data.price,
        owner: req.user._id,
        geometry: response.data.features[0].geometry
    };

    // 2. Ab safe check ke andar image extract karein
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        
        obj.image = {
            url: url,
            filename: filename
        };
        
        console.log("Image Uploaded:", filename, url); 
    } else {
        // Optional: Agar image nahi hai toh default set kar sakte ho
        obj.image = {
            url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop",
            filename: "defaultlistingimage"
        };
    }

    await Listing.create(obj);
    req.flash("success", "New listing created!");
    let redirectUrl = req.session.redirectUrl || "/listings";
    delete req.session.redirectUrl; 
    res.redirect(redirectUrl);
}));




//for all other routes throw an error and catch it using middleware
// app.all("/*splat", (req, res, next) => {
//     next(new ExpressError(404, "Page not found"));
// });


//error handling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    console.log(err.status, err.message);
    // res.status(status).send(message);
    return res.render("error.ejs", { message });
});