const {Schema, model} = require('mongoose');

const captionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true}
});

const Caption = mongoose.model('Caption', captionSchema);

module.exports = Caption;