const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const has = require('../routes/middelware/hash')

const userSchema = new Schema({
  name:  String,
  email: String,
  password: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Todo'}],
});
userSchema.plugin(timestamps);
userSchema.pre('save',function(){
  if(this.password)this.password = has.generate(this.password)
})

const User = mongoose.model('User', userSchema);
module.exports = User