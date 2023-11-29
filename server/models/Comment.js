const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref:'Post', required: true },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;