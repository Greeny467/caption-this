const {Schema, model} = require('mongoose');
const userSchema = require('./User');

const captionSchema = new Schema({
  text: { type: String, required: true },
  user: { type: userSchema, required: true },
  likes: { type: Number, default: 0 },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true}
});

const Caption = model('Caption', captionSchema);

module.exports = Caption;