const mongoose = require('mongoose');
const Listing = require('../models/listings');
const initData = require("./data2.js"); // data2.js file import ki
require('dotenv').config({ path: '../.env' }); 

const dbUrl = process.env.ATLAS_DB_URL;

async function main() {
    await mongoose.connect(dbUrl);
}

main()
    .then(() => {
        console.log("Connection established with Atlas!");
        initDB();
    })
    .catch((err) => {
        console.log("DB Connection Error:", err);
    });

const initDB = async () => {
    try {
        // 1. Purana data delete karo
        await Listing.deleteMany({}); 

        // 2. Data as-it-is insert karo (initData.data2 use kar rahe hain)
        // Isme owner aur geometry pehle se hai, toh kuch badalne ki zaroorat nahi
        await Listing.insertMany(initData.data2);
        
        console.log("Data was initialized EXACTLY as provided!");
    } catch (err) {
        console.log("Initialization Error:", err);
    } finally {
        mongoose.connection.close();
    }
}