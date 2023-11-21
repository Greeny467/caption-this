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
        })
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
            user
            imageURL
            createdAt
            caption
            captions
            comments
        }
    }
`;

// create new caption
export const ADD_CAPTION = gql`
    mutation addCaption($caption: captionInput!) {
        addCaption(caption: $caption) {
            _id
            text
            user
            likes
            createdAt
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
            user
            likes
            createdAt
            postId
        }
    }
`;