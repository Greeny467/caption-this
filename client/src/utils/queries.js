import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me{
            _id
            username
            email
            posts {
                _id
                user
                imageURL
            }
            captions {
                _id
                text
                user
                postId
            }
            comments {
                _id
                text
                user
                postId
            }
            votes {
                votePost
                voteCaption
            }
        }
    }
`;

// export const ALL_POSTS = gql`
//     query allPosts {
//         allPosts{
//             _id
//             user {
//                 _id
//                 username
//             }
//             imageURL
//             caption {
//                 _id
//                 text
//                 user
//                 postId
//             }
//             captions {
//                 _id
//                 text
//                 user
//                 postId
//             }
//             comments {
//                 _id
//                 text
//                 user
//                 postId
//             }
//         }
//     }
// `;

// export const SINGLE_POST = gql`
//     query singlePost($requestedPostId: ID!) {
//         singlePost(requestedPostId: $requestedPostId){
//             _id
//             user {
//                 _id
//                 username
//             }
//             imageURL
//             caption {
//                 _id
//                 text
//                 user
//                 postId
//             }
//             captions {
//                 _id
//                 text
//                 user
//                 postId
//             }
//             comments {
//                 _id
//                 text
//                 user
//                 postId
//             }
//         }
//     } 
// `;

// export const USER = gql`
//     query user($requestedUserId: ID!) {
//         user(requestedUserId: $requestedUserId){
//             _id
//             username
//             email
//             posts {
//                 _id
//                 user
//                 imageURL
//             }
//             captions {
//                 _id
//                 text
//                 user
//                 postId
//             }
//             comments {
//                 _id
//                 text
//                 user
//                 postId
//             }
//             votes {
//                 postId
//                 captionId
//             }
//         }
//     }
// `;


// export const SINGLE_CAPTION = gql`
//     query singleCaption($captionId: ID!) {
//         singleCaption(captionId: $captionId){
//             _id
//             text
//             user 
//             likes
//             postId
//         }
//     }
// `;