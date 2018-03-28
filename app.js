require ('dotenv').config()
const express = require('express')
const bodyParser =require('body-parser')
const mongoose = require ('mongoose')
const cors = require ('cors')
const logger = require('morgan')

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
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;