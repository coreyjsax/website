const mongoose = require('mongoose')
const Notebook_Schema = new mongoose.Schema({
    name: {
        label: String,
        value: String,
    },
    description: String, 
    author: String,
    created: Date, 
    updated: {
        type: Date,
        default: Date.now
    },
    image: {
        image_name: String,
        upload_date: {
            type: Date,
            default: Date.now
        },
        url: String
    },
    public: Boolean,
    notes: String,
    entries: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}]

})
module.exports = mongoose.model('Notebook', Notebook_Schema)