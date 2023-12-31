const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = 2 * 60 * 60;


module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      req.user = null
      return req.user;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err){
      console.log('Invalid token');
      console.error(err)
      if (err.name === 'TokenExpiredError') {
        throw new Error('Token has expired', {
          code: 'TOKEN_EXPIRED',
          expiredAt: err.expiredAt,
        })
      };
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload, iat: Math.floor(Date.now() / 1000) }, secret, { expiresIn: expiration });
  },
};
