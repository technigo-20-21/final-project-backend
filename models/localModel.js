import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const localSchema = new Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LocalCategory'
    },
    name: {
        type: String,
    },
    tagline: {
        type: String,
    },
    img_url: {
        type: String,
    },
    img_id: {
        type: String
    },
    street_address: {
        type: String
    },
    zip_code: {
        type: String
    },
    geolocation:{
        type: {
            type: String,
            default: "Point",
        },
        coordinates: [Number],
    },
    phone_number: {
        type: String,
    },
    email: {
        type: String,
    },
    web_shop: {
        type: String,
    },
    booking: {
        type: String,
    },
    url: {
        type: String,
    }
});
const Local = mongoose.model("Local", localSchema);
module.exports = Local;
