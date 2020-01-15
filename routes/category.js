const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/category')
const c = categoryController

router.route('/')
    .get(c.getAllCategories)

module.exports = router;