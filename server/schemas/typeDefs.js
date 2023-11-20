const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        createdAt: String
        posts: [ID]
        captions: [ID]
        comments: [ID]
    }
    type Post {
        _id: ID!
        user: ID!
        imageURL: String!
        createdAt: String
        caption: String
        captions: [ID]
        comments: [ID]
    }
    type Comment {
        _id: ID!
        text: String!
        user: ID!
        createdAt: String
        postId: ID!
    }
    type Caption {
        _id: ID!
        text: String!
        user: ID!
        likes: Int
        createdAt: String
        postId: ID!
    }
`