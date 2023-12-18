const { gql } = require('apollo-server-express');


const typeDefs = gql`

    type User {
        _id: ID!
        username: String!
        email: String
        posts: [Post]
        captions: [Caption]
        comments: [Comment]
        votes: [Vote]
    }
    type Post {
        _id: ID!
        user: User!
        imageURL: String!
        caption: Caption
        captions: [Caption]
        comments: [Comment]
        timerDate: String
    }
    type Comment {
        _id: ID!
        text: String!
        user: User!
        postId: ID!
    }
    type Caption {
        _id: ID!
        text: String!
        user: User!
        votes: Int!
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
    type SetTimerResponse {
        success: Boolean!
        message: String
    }

    type Query {
        me: User
        allPosts: [Post]
        singlePost(requestedPostId: ID!): Post
        user(requestedUserId: String!): User
        singleCaption(captionId: ID!): Caption
    }


    input userData {
        _id: ID!
        username: String!
    }

    input postInput {
        _id: ID
        user: ID!
        imageURL: String!
        caption: ID
        captions: [ID]
        comments: [ID]
        timerDate: String
    }

    input captionInput {
        _id: ID
        text: String!
        user: userData!
        votes: Int
        postId: ID!
    }

    input commentInput {
        _id: ID
        text: String!
        user: userData!
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

        setTimedCaption(time: Int!, post: String!): SetTimerResponse

    }
`;


module.exports = typeDefs;

