const {Schema, model} = require('mongoose');
const userSchema = require('./User');

const captionSchema = new Schema({
  text: { type: String, required: true },
  user: {
    _id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    username: {type: String, required: true}
  },
  votes: { type: Number, default: 0 },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true}
});

const Caption = model('Caption', captionSchema);

module.exports = Caption;