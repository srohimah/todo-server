const express = require('express')
const router = express.Router()
const {signIn, signUp} = require('../controller/controller.user')
const todo = require('./route.todo')

router.get('/', (req, res)=> res.send({message : "what's your todo"}))
router.post('/signin', signIn)
router.post('/signup', signUp)
router.use('/task', todo)

module.exports = router