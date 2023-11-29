import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me{
            _id
            username
            email
            posts
            captions
            comments
            votes {
                votePost
                voteCaption
            }
        }
    }
`;

export const ALL_POSTS = gql`
    query allPosts {
        allPosts{
            _id
            user
            imageURL
            caption
            captions
            comments
        }
    }
`;

export const SINGLE_POST = gql`
    query singlePost($requestedPostId: ID!) {
        singlePost(requestedPostId: $requestedPostId){
            _id
            user
            imageURL
            caption
            captions
            comments
        }
    } 
`;

export const USER = gql`
    query user($requestedUserId: ID!) {
        user(requestedUserId: $requestedUserId){
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


export const SINGLE_CAPTION = gql`
    query singleCaption($captionId: ID!) {
        singleCaption(captionId: $captionId){
            _id
            text
            user 
            likes
            postId
        }
    }
`;