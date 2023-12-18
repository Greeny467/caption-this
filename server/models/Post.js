const {Schema, model} = require('mongoose');

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    imageURL: { type: String, required: true },
    caption: { type: Schema.Types.ObjectId, ref: 'Caption' },
    captions: [{ type: Schema.Types.ObjectId, ref: 'Caption' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    timerDate: {type: Date, required: true}
  });

  const Post = model('Post', postSchema);

  module.exports = Post;