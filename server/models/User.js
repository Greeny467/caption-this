const {Schema, model} = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    captions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Caption' }],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Caption' }]
  });

  const User = mongoose.model('User', userSchema);

  module.exports = User;