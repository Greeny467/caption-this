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
    type Auth {
        token: ID!
        user: User
    }




    type Query {
        me: User
        allPosts: [Post]
        singlePost(requestedPostId: ID!): Post
        user(requestedUserId: ID!): User
    }



    input postInput {
        _id: ID
        user: ID!
        imageURL: String!
        createdAt: String
        caption: String
        captions: [ID]
        comments: [ID]
    }

    input captionInput {
        _id: ID
        text: String!
        user: ID!
        likes: Int
        createdAt: String
        postId: ID!
    }

    input commentInput {
        _id: ID
        text: String!
        user: ID!
        createdAt: String
        postId: ID!
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username:String!, email: String!, password: String!): Auth

        addPost(post: postInput): Post
        addCaption(caption: captionInput): Caption
        addComment(comment: commentInput): Comment
        captionVote(caption: captionInput, update: String!): Caption
    }
`