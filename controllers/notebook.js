const Notebook = require('../models/notebook')

exports.getAllNotebooks = (req, res) => {
    Notebook.find({}, (err, docs) => {

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

exports.postNotebook = (req, res) => {
    const newNotebook = {
        name: {
            label: req.body.label,
            value: req.body.value
        },
        description: req.body.description,
        notes: req.body.notes, 
        author: req.body.author,
        public: req.body.public
    }
    Notebook.create(newNotebook, (err, newlyCreated) => {
        err ? res.status(404).send({status: 404, message: err})
            : res.status(200).send({status: 200, message: "notebook post request succeeded", data: newlyCreated})
    })
}

exports.getNotebookById = (req, res) => {
    let notebookId = req.params.id
    let notebook = Notebook.find({_id: notebookId}).exec()
    notebook.then((doc, err) => {
        !doc ? res.status(404).send({status: 404, message: "document not found", data: err})
             : res.json(doc)
    })
}

exports.deleteNotebook = (req, res) => {

}

exports.editNotebook = (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    let notebookId = req.params.id
    
    Notebook.findByIdAndUpdate(notebookId, req.body, (err, doc) => {
        console.log(err)
        if (err){
            if(!doc){
                res.status(404).send({ message: "document not found"})
            } else {
                res.status(500).send({ message: "server error", data: err })
            }
        } else {
            res.status(200).send({
                status: 200,
                data: doc
            })
        }
    })
}