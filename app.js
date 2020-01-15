const express = require('express')


const app = express();
const mongoose = require('mongoose')
const logger = require('morgan')

require('dotenv').config()

const bodyParser = require('body-parser')
const cors = require('cors')

const mongooseOptions = {
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false, limit:'5mb'}));

mongoose.connect(
    process.env.DB,
    mongooseOptions
).then(() => console.log("DB connected"));

process.env.NODE_ENV = "development"
app.use(logger('dev'))

//Routes
apiIndex = require('./routes/index')
apiCategory = require('./routes/category')
apiNotebook = require('./routes/notebook')
apiEntry = require('./routes/entry')

const error = (req, res) => res.status(400).send({status: 400, message: "resource not found"})

app.use('/api', apiIndex)
app.use('/api/category', apiCategory)
app.use('/api/notebook', apiNotebook)
app.use('/api/entry', apiEntry)
app.use('*', error)



const port = process.env.PORT || 5000;
app.listen(port);




console.log(`Welcome back Corey. Server running on ${port}`)