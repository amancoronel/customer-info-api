require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3005

// IMPORT MIDDLEWARES
require('./middlewares')(app)
// IMPORT MODELS
require('./models')
// IMPORT ROUTE FOLDER
require('./routes')(app)

app.listen(PORT, async () => {
    console.log(`Express running at PORT : ${PORT}`)
})