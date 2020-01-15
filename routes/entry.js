const express = require('express')
const router = express.Router()

const entryController = require('../controllers/entry')
const e = entryController

router.route('/')
    .get(e.getAllEntries)
    .post(e.createEntry)

module.exports = router