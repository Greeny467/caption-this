const {Schema, model} = require('mongoose');
const userSchema = require('./User');

const commentSchema = new Schema({
  text: { type: String, required: true },
  user: {
    _id: {type: Schema.Types.ObjectId, ref:'User', required: true},
    username: {type: String, required: true}
  },
  postId: { type: Schema.Types.ObjectId, ref:'Post', required: true },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;