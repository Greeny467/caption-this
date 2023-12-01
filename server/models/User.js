const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: { 
      type: String, 
      unique: true, 
      required: true 
    },
    email: { 
      type: String,
      unique: true, 
      required: true,
      match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: { 
      type: String, 
      required: true 
    },


    posts: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Post' 
    }],
    captions: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Caption' 
    }],
    comments: [{
      type: Schema.Types.ObjectId, 
      ref: 'Caption' 
    }],
    votes: [{
      votePost: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      },
      voteCaption: {
        type: Schema.Types.ObjectId,
        ref: 'Caption'
      },
    }]
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  };

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

  const User = model('User', userSchema);

  module.exports = User;