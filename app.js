require ('dotenv').config()
const express = require('express')
const bodyParser =require('body-parser')
const mongoose = require ('mongoose')
const cors = require ('cors')
const logger = require('morgan')

var app = express();
app.use(cors())
const url = "mongodb://srohimah:12345@ds117469.mlab.com:17469/todo"
mongoose.connect(url, err=>{
  if(!err){
    console.log('connected to database')
  }
})

const app = express()
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/todo',require('./routes/route.user'))
app.listen(3000, ()=>{
    console.log("let's start")
})