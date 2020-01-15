const Entry = require('../models/entry')
const Notebook =require('../models/notebook')

exports.getAllEntries = (req, res) => {
    const getAllEntries = Entry.find({}).exec()
    getAllEntries.then((entries, err) => {
        if (!entries) {
            res.status(404).send({status: 404, message: "sorry brah"})
        } else {
            if (err){
                res.status(500).send({status: 500, message: "server error"})
            } else {
                res.json(entries)
            }
        }
    })
}

exports.createEntry = (req, res) => {
    //create entry
    //add entry to notebook
    const new_entry = {
       name: {
           label: req.body.label,
           value: req.body.value
       } ,
       summary: req.body.summary,
       author: req.body.author,
       body: req.body.body,
       public: req.body.public,
       notes: req.body.notes
    }
        Entry.create(new_entry, (err, newlyCreated) => {
            if (err) {
                res.status(500).send({status: 500, message: '', data: newlyCreated})
            } else {
                res.status(200).send({status: 200, message: 'Post succeeded', data: newlyCreated})
            }
        })
    }
