const mongoose = require('mongoose');
// const User = require('../models/user.model');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    baseUrl: {
        type: String,
        required: true,
        trim: true
    },
    shortenedCode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    createdBy: {
        type: String
    }
}, {
    timestamps: true
});

const Url = mongoose.model('Urls', urlSchema);

module.exports = Url;