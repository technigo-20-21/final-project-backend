import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const localSchema = new Schema({
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
    img: {
        type: String,
    },
    url: {
        type: String,
    }
});

const local = mongoose.model("local", localSchema);
module.exports = local;
