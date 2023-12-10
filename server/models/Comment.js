const {Schema, model} = require('mongoose');
const userSchema = require('./User');

const commentSchema = new Schema({
  text: { type: String, required: true },
  user: { type: userSchema, required: true },
  postId: { type: Schema.Types.ObjectId, ref:'Post', required: true },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;