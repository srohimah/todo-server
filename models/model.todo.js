const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task:  String,
  description: String,
  status: {type:String, default:"incomplate"},
  completed_date : Date
});
todoSchema.plugin(timestamps);


const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo
