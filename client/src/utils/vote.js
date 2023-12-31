import client from '../apollo';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import { ADD_USER_VOTE, REMOVE_USER_VOTE, ADD_VOTE } from './mutations';
import { SINGLE_CAPTION } from './queries';


const addUserVote = async (postId, captionId) => {
    try {
        const { data } = await client.mutation({
            mutate: ADD_USER_VOTE,
            variables: {
                postId: postId,
                captionId: captionId
            },
        });

        return data;
    } catch (error) {
        console.error(error);
        return null; 
    }
};

const removeUserVote = async (postId, captionId) => {
    try {
        const { data } = await client.mutation({
            mutate: REMOVE_USER_VOTE,
            variables: {
                postId: postId,
                captionId: captionId
            },
        });

        return data;
    } catch (error) {
        console.error(error);
        return null; 
    }
};

const changeVote = async (caption, update) => {
    try {
        const { data } = await client.mutation({
            mutate: ADD_VOTE,
            variables: { 
                caption: caption,
                update: update
             },
        });

        return data;
    } catch (error) {
        console.error(error);
        return null; 
    }
};


const findCaption = async (id) => {
    try {
        const { data } = await client.query({
            query: SINGLE_CAPTION,
            variables: { id },
        });

        return data;
    } catch (error) {
        console.error(error);
        return null; 
    }
};

export default async function vote (user, caption) {

    const captionId = caption._id;
    const postId = caption.postId;

    const voteExists = user.votes.some((vote) => vote.votePost === postId && vote.voteCaption === captionId);
    const hasVote = user.votes.some((vote) => vote.votePost === postId);

    if(voteExists){
        const {downVoteData} = await changeVote(caption, 'decrease');

        if(!downVoteData){
            throw new Error('failed to remove vote from caption');
        }

        const {removeUserVoteData} = await removeUserVote(postId, captionId);

        if(!removeUserVoteData) {
            throw new Error('failed to remove vote from user');
        };

        const updatedCaption = await findCaption(captionId);

        if(!updatedCaption) {
            throw new Error('failed to find downvoted caption');
        };

        return updatedCaption;
    }

    if(hasVote){
        const existingVote = user.votes.find((vote) => vote.votePost === postId);
        const oldCaption = await findCaption(existingVote.voteCaption);

        const {downVoteData} = await changeVote(oldCaption, 'decrease');

        if(!downVoteData) {
            throw new Error('failed to decrease caption vote');
        };

        const {removeUserVoteData} = await removeUserVote(existingVote.votePost, existingVote.voteCaption);

        if(!removeUserVoteData) {
            throw new Error('failed to remove vote from user');
        }

        const {addUserVoteData} = await addUserVote(postId, captionId);

        if(!addUserVoteData) {
            throw new Error('failed to add new vote to user');
        };

        const {upVoteData} = await changeVote(caption, 'increase');

        if(!upVoteData) {
            throw new Error('failed to increase caption vote');
        }


        const newCaption = await findCaption(captionId);

        if(!newCaption) {
            throw new Error('failed to find new caption');
        };

        return newCaption;
    };

    if(!hasVote){
        const {addUserVoteData} = await addUserVote(postId, captionId);

        if(!addUserVoteData) {
            throw new Error('failed to create userVote');
        };

        const {upVoteData} = await changeVote(caption, 'increase');

        if(!upVoteData) {
            throw new Error('failed to increase caption vote for initial vote.');
        };

        const newCaption = await findCaption(captionId);

        if(!newCaption) {
            throw new Error('failed to find updated caption');
        };

        return newCaption;
    }
};

export const voteStyleFinder = async (user, caption) => {
    const existingVote = user.votes.find((vote) => vote.votePost === postId);
    if(existingVote) {
        return('voteBtnOn');
    };
    if(!existingVote) {
        return('voteBtnOff');
    };
};