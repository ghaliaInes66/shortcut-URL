const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShortId = require('shortid');

const shortLinkSchema = new Schema({
    url: {
        type: String,
        required: true
    },

    ShortURL: {
        type: String,
        required: true,
        default: ShortId.generate
    },

    userID: {
        type: String,
        required: true
    },
}, {timestamps: true});

const ShortLink = mongoose.model('ShortLink', shortLinkSchema);
module.exports = ShortLink;