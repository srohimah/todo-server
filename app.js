require ('dotenv').config()
const express = require('express')
const bodyParser =require('body-parser')
const mongoose = require ('mongoose')
const cors = require ('cors')
const logger = require('morgan')

mongoose.connect(`mongodb://127.0.0.1/todo`)

const app = express()
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/todo',require('./routes/route.user'))
app.listen(3000, ()=>{
    console.log("let's start")
})