// resolvers.js
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/User'); // Your User model

const app = express();

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: Boolean
  }
`;

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
};

const resolvers = {
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Create and sign a JWT token
        const token = generateToken(newUser);

        return { token, user: newUser };
      } catch (error) {
        console.error(error);
        throw new Error('Signup failed');
      }
    },

    login: async (_, { email, password }) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('Invalid credentials');
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        // Create and sign a JWT token
        const token = generateToken(user);

        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('Login failed');
      }
    },

    logout: (_, __, context) => {
      // Assuming you're using JWT for authentication and Express with context
      context.res.clearCookie('authToken'); // Clear the authentication token

      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
