// resolvers.js

const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/User'); // Your User model

const resolvers = {
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

      return { token, user };
    },
  },
};

module.exports = resolvers;
