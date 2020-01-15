const mongoose = require('mongoose')
const Entry_Schema = new mongoose.Schema({
    title: {
        label: String, 
        value: String,
    },
    summary: String,
    author: String,
    updated: {
        type: Date,
        default: Date.now
    },
    body: String,
    images: [

    ],
    public: Boolean,
    notes: String
})
module.exports = mongoose.model('Entry', Entry_Schema)