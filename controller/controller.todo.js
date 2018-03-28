const Todo = require('../models/model.todo')
const User = require('../models/model.user')

module.exports ={
    listTodo: (req, res) => {
        User.findById(req.body.id)
        .populate({
            path:"tasks",
            // match: {status:"incomplate"},
        })
        .exec().then(data=>{
            res.send({
                name : data.name,
                email : data.email,
                tasks : data.tasks
            })
        }).catch(err=>res.send(err))
    },

    addTodo: (req, res) => {
        let todo = new Todo({
            task: req.body.task,
            description:req.body.description,
            status: 'incomplate',
            completed_date: null,
        });
        todo.save().then(newTodo=>{
            User.findById(req.body.id).then(dataUser=>{
                dataUser.tasks.push(todo._id)
                dataUser.save()
                res.send({
                    message:'new todo created',
                    newTodo
                })
            }).catch(err=>res.send(err))
        }).catch(err=>res.send(err))
        
    },

    editTodo(req, res){
        Todo.findByIdAndUpdate(req.params.id, req.body).then(updatedData=>{
            res.send({
                message : 'todo successfully updated',
                updatedData
            })
        }).catch(err=>res.send(err))

    },
    deleteTodo(req, res){
        Todo.findByIdAndRemove(req.params.id).then(data=>{
            User.findById(req.body.id).then(dataUser=>{
                dataUser.tasks.remove(req.params.id)
                dataUser.save()
                res.send({
                    message : `data with id ${req.params.id} removed`,
                    dataUser
                })
            })
        })
    },
    complateTodo(req, res){
        Todo.findByIdAndUpdate(req.params.id, { $set: { status: 'complate', completed_date:Date.now() }}).then(data=>{
            res.send({
                message :`your todo with task '${data.task}' completed`,
                data
            })
        }).catch(err=>res.send(err))
    },
    incomplateTodo(req, res){
        Todo.findByIdAndUpdate(req.params.id, { $set: { status: 'incomplate', completed_date:null }}).then(data=>{
            res.send({
                message :`your todo with task '${data.task}' incomplete`,
                data
            })
        }).catch(err=>res.send(err))
    }
}