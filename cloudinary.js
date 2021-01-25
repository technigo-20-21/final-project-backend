import cloudinaryFramework from 'cloudinary';
import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
    cloud_name: 'dqg3xeick',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = cloudinaryStorage({
    cloudinary,
    params: {
        folder: 'image_logo', 
        transformation:[{ width: 300, height: 300, crop: 'limit'}]
    },
})

const parser = multer({ storage })