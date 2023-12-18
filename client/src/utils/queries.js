import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me{
            _id
            username
            email
            posts {
                _id
                user {
                    _id
                    username
                }
                imageURL
            }
            captions {
                _id
                text
                user {
                    _id
                    username
                }
                votes
                postId
            }
            comments {
                _id
                text
                user {
                    _id
                    username
                }
                postId
            }
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
            user {
                _id
                username
            }
            imageURL
            caption {
                _id
                text
                user {
                    _id
                    username
                }
                postId
            }
            captions {
                _id
                text
                user {
                    _id
                    username
                }
                votes
                postId
            }
            comments {
                _id
                text
                user {
                    _id
                    username
                }
                postId
            }
        }
    }
`;

export const SINGLE_POST = gql`
    query singlePost($requestedPostId: ID!) {
        singlePost(requestedPostId: $requestedPostId){
            _id
            user {
                _id
                username
            }
            imageURL
            caption {
                _id
                text
                user {
                    _id
                    username
                }
                votes
                postId
            }
            captions {
                _id
                text
                user{
                    _id
                    username
                }
                votes
                postId
            }
            comments {
                _id
                text
                user{
                    _id
                    username
                }
                postId
            }
            timerDate
        }
    } 
`;

export const USER = gql`
    query user($requestedUserId: String!) {
        user(requestedUserId: $requestedUserId){
            _id
            username
            email
            posts {
                _id
                user{
                    _id
                    username
                }
                imageURL
            }
            captions {
                _id
                text
                user {
                    _id
                    username
                }
                votes
                postId
            }
            comments {
                _id
                text
                user {
                    _id
                    username
                }
                postId
            }
            votes {
                votePost
                voteCaption
            }
        }
    }
`;


export const SINGLE_CAPTION = gql`
    query singleCaption($captionId: ID!) {
        singleCaption(captionId: $captionId){
            _id
            text
            user{
                _id
                username
            }
            votes
            postId
        }
    }
`;