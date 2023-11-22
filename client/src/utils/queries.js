import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me{
            _id
            username
            email
            createdAt
            posts
            captions
            comments
            votes {
                postId
                captionId
            }
        }
    },
    query allPosts {
        allPosts{
            _id
            user
            imageURL
            createdAt
            caption
            captions
            comments
        }
    },
    query singlePost($requestedPostId: ID!) {
        singlePost(requestedPostId: $requestedPostId){
            _id
            user
            imageURL
            createdAt
            caption
            captions
            comments
        }
    }
    query user($requestedUserId: ID!) {
        user(requestedUserId: $requestedUserId){
            _id
            username
            email
            createdAt
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