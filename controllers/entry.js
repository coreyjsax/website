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
    let notebookId = req.body.notebookId

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
      
    Notebook.findById(notebookId, (err, notebook) => {
       if (err){
           res.status(500).send({status: 500, message: "Error!"})
       } else {
           Entry.create(new_entry, (err, entry) => {
               if (err){
                   res.status(500).send({status: 500, message: "error", error: err})
               } else {
                   entry.save()
                   notebook.entries.push(entry)
                   notebook.save()
                   res.status(201).send({status: 201, message: "success bro", data: entry})
               }
           })
       }
    })
}


     /*  Entry.create(new_entry, (err, newlyCreated) => {
            if (err) {
                res.status(500).send({status: 500, message: '', data: newlyCreated})
            } else {
                console.log(newlyCreated._id)
                Notebook.find({_id: req.params.id}, (req, res) => {

                })
                res.status(200).send({status: 200, message: 'Post succeeded', data: newlyCreated})
            }
        }) */