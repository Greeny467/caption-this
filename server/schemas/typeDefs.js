const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID!
        username: String!
        email: String
        posts: [ID]
        captions: [ID]
        comments: [ID]
        votes: [Vote]
    }
    type Post {
        _id: ID!
        user: User!
        imageURL: String!
        caption: Caption
        captions: [Caption]
        comments: [Comment]
    }
    type Comment {
        _id: ID!
        text: String!
        user: ID!
        postId: ID!
    }
    type Caption {
        _id: ID!
        text: String!
        user: ID!
        likes: Int
        postId: ID!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Vote {
        votePost: ID
        voteCaption: ID
    }

    type UploadResponse {
    success: Boolean!
    presignedUrl: String
    error: String
    }

    type Query {
        me: User
        allPosts: [Post]
        singlePost(requestedPostId: ID!): Post
        user(requestedUserId: ID!): User
        singleCaption(captionId: ID!): Caption
    }



    input postInput {
        _id: ID
        user: ID!
        imageURL: String!
        caption: ID
        captions: [ID]
        comments: [ID]
    }

    input captionInput {
        _id: ID
        text: String!
        user: ID!
        likes: Int
        postId: ID!
    }

    input commentInput {
        _id: ID
        text: String!
        user: ID!
        postId: ID!
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username:String!, email: String!, password: String!): Auth

        addPost(post: postInput): Post
        addCaption(caption: captionInput): Caption
        addComment(comment: commentInput): Comment

        captionVote(caption: captionInput, update: String!): Caption
        addUserVote(postId: ID!, captionId: ID!): User
        removeUserVote(postId: ID!, captionId: ID!): User

        getPresignedUrl(key: String!): UploadResponse
    }
`;


module.exports = typeDefs;

