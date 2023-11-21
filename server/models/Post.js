const {Schema, model} = require('mongoose');

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    imageURL: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    caption: { type: Schema.Types.ObjectId, ref: 'Caption' },
    captions: [{ type: Schema.Types.ObjectId, ref: 'Caption' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  });

  const Post = model('Post', postSchema);

  module.exports = Post;