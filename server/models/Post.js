const {Schema, model} = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageURL: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    caption: { type: mongoose.Schema.Types.ObjectId, ref: 'Caption' },
    captions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Caption' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  });

  const Post = mongoose.model('Post', postSchema);

  module.exports = Post;