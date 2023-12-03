const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas/index');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const startApolloServer = async () => {
  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.post('/createPost', async (req, res) => {
    try {
      const { file, fileName } = req.body;
      if (!file || !fileName) {
        return res.status(400).send('Invalid request parameters');
      }

      const uploadResult = await uploadFileToS3(file, fileName);

      if (uploadResult) {
        return res.status(200).send(uploadResult);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  });

  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
