const {Schema, model} = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  postId: { type: mongoose.Schema.Types.ObjectId, ref:'Post', required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;