const express = require('express')
const router = express.Router()

const notebookController = require('../controllers/notebook')
const c = notebookController

router.route('/')
    .get(c.getAllNotebooks)
    .post(c.postNotebook)

router.route('/:id')
    .get(c.getNotebookById)
    .patch(c.editNotebook)
    
module.exports = router;