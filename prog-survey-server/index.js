// require dependencies
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')
const mongoose = require('mongoose')
const PLang = require('./model/plang');
const Vote = require('./helpers/Vote');
const mainRouter = require('./routes/main/mainRoute');
require('dotenv').config()

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

// connect to the database
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true }, err => {
    if (err) { console.log('err') }
    else { console.log('connected to database') }
    
    // routes
    app.use('/', mainRouter);
    
})

// listen to port
app.listen(PORT, ()  => console.log(`connected to port ${PORT}`))