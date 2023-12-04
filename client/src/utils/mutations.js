import { gql } from '@apollo/client';

// login
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// sign up or create user
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;




// create new post
export const ADD_POST = gql`
    mutation addPost($post: postInput!) {
        addPost(post: $post) {
            _id
            user{
                _id
            }
            imageURL
        }
    }
`;

// create new caption
export const ADD_CAPTION = gql`
    mutation addCaption($caption: captionInput!) {
        addCaption(caption: $caption) {
            _id
            text
            user {
                _id
                username
            }
            postId
        }
    }
`;

// create new comment
export const ADD_COMMENT = gql`
    mutation addComment($comment: commentInput!) {
        addComment(comment: $comment) {
            _id
            text
            user {
                _id
                username
            }
            postId
        }
    }
`;

export const ADD_VOTE = gql`
    mutation captionVote($caption: captionInput!, $update: String!) {
        captionVote(caption: $caption, update: $update) {
            _id
            text
            user {
                _id
                username
            }
            likes
            postId    
        }
    }
`;

export const ADD_USER_VOTE = gql`
    mutation addUserVote($postId: ID!, $captionId: ID!) {
        addUserVote(postId: $postId, captionId: $captionId) {
            _id
            username
            email
            posts
            captions
            comments
            votes {
                postId
                captionId
            }
        }
    }
`;

export const REMOVE_USER_VOTE = gql`
    mutation removeUserVote($postId: ID!, $captionId: ID!) {
        removeUserVote(postId: $postId, captionId: $captionId) {
            _id
            username
            email
            posts
            captions
            comments
            votes {
                postId
                captionId
            }
        }
    }
`;

export const SET_TIMED_CAPTION = gql`
    mutation setTimedCaption($time: Int!, $post: String!) {
        setTimedCaption(time: $time, post: $post) {
            success
            message
        }
    }
`;
