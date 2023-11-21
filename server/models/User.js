const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    captions: [{ type: Schema.Types.ObjectId, ref: 'Caption' }],
    comments: [{type: Schema.Types.ObjectId, ref: 'Caption' }]
  });

  const User = model('User', userSchema);

  module.exports = User;