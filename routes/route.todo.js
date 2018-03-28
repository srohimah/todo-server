const express = require('express')
const router = express.Router()
const {listTodo, addTodo, editTodo, deleteTodo, complateTodo, incomplateTodo} = require('../controller/controller.todo')
const {verify} = require('./middelware/auth')

router.use(verify)
router.get('/', listTodo)
router.post('/', addTodo)
router.put('/:id', editTodo)
router.delete('/:id', deleteTodo)
router.put('/complate/:id', complateTodo)
router.put('/incomplate/:id', incomplateTodo)

module.exports = router