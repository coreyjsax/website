const mongoose = require('mongoose')

var Categories_Schema = new mongoose.Schema({
    name: {
        label: String,
        value: String
    },
    description: String, 
    notes: String,
    author: String,
    created: Date, 
    updated: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Category', Categories_Schema)