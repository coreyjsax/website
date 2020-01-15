const Category = require('../models/category')
const request = require('request-promise-cache')
const tools = require('../util/tools')


exports.getAllCategories =(req, res) => {
    
    Category.find({}, (err, docs) => {
        if (err) {
            if (!docs){

                res.status(404).send({status: 404, message: 'No locations found'});
            } else {
                res.status(500).send({message: 'There was a problem...'});
            }
        } else {
            if (docs.length === 0) {
                res.status(404).send({status: 404, message: 'No locations found'});
            } else {
                res.json(docs);
            }
        }
    })
}

exports.postCategory = (req, res) => {
    const newCategory = {
        name: {
            label: req.body.label,
            value: req.body.value
        },
        description: req.body.description,
        notes: req.body.notes, 
        author: req.body.author,
    }
    Category.create(newCategory, (err, newlyCreated) => {
        if (err){
            res.status(404).send({status: 404, message: err})
        } else {
            res.status(200).send({status: 200, message: "category post request succeeded", data: newlyCreated})
        }
    })
}