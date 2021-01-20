import mongoose from 'mongoose';

module.exports = Company;
Schema = mongoose.Schema;


const company = new Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    tagline: {
        type: String,
    },
    image_logo: {
        type: String,
    },
    website_link: {
        type: String,
    }
});

module.exports = company;
