const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 1. Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// 2. Storage engine setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'stayvista_DEV', // Cloudinary mein folder ka naam
        allowedFormats: ["png", "jpg", "jpeg"],

    },
});

module.exports = {
    cloudinary,
    storage,
};