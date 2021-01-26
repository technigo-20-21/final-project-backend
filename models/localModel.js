import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const localSchema = new Schema({
    category: {
        type: String,
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
    url: {
        type: String,
    }
});

const Local = mongoose.model("Local", localSchema);
module.exports = Local;
