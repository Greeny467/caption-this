import client from '../apollo';

import { ADD_USER_VOTE, REMOVE_USER_VOTE, ADD_VOTE } from './mutations';
import { SINGLE_CAPTION } from './queries';


const addUserVote = async (postId, captionId) => {
    try {
        const { data } = await client.mutate({
            mutation: ADD_USER_VOTE,
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
        const { data } = await client.mutate({
            mutation: REMOVE_USER_VOTE,
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

    const mutationCaption = {
        _id : caption._id,
        text : caption.text,
        user : {
            _id: caption.user._id,
            username: caption.user._id
        },
        votes: caption.votes,
        postId : caption.postId,
    }
    try {
        const { data } = await client.mutate({
            mutation: ADD_VOTE,
            variables: { 
                caption: mutationCaption,
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
            variables: {
                captionId: id
            },
        });

        return data.singleCaption;
    } catch (error) {
        console.error(error);
        return null; 
    }
};

export default async function vote (user, caption) {

    const captionId = caption._id;
    const postId = caption.postId;

    let voteExists = false;
    let hasVote = false;

    if(user.votes.length > 0) {
        voteExists = user.votes.some((vote) => vote.votePost === postId && vote.voteCaption === captionId);
        hasVote = user.votes.some((vote) => vote.votePost === postId);
    }

    if(voteExists){
        const downVoteData = await changeVote(caption, 'decrease');

        if(!downVoteData){
            throw new Error('failed to remove vote from caption');
        }

        const removeUserVoteData = await removeUserVote(postId, captionId);

        if(!removeUserVoteData) {
            throw new Error('failed to remove vote from user');
        };

        return true;
    }

    if(hasVote){
        const existingVote = user.votes.find((vote) => vote.votePost === postId);
        const oldCaption = await findCaption(existingVote.voteCaption);

        if(!oldCaption){
            throw new Error('failed to get old caption');
        }

        if(oldCaption && oldCaption != undefined){
            const downVoteData = await changeVote(oldCaption, 'decrease');

            if(!downVoteData) {
                throw new Error('failed to decrease caption vote');
            };

            const removeUserVoteData = await removeUserVote(existingVote.votePost, existingVote.voteCaption);

            if(!removeUserVoteData) {
                throw new Error('failed to remove vote from user');
            }

            const addUserVoteData = await addUserVote(postId, captionId);

            if(!addUserVoteData) {
                throw new Error('failed to add new vote to user');
            };

            const upVoteData = await changeVote(caption, 'increase');

            if(!upVoteData) {
                throw new Error('failed to increase caption vote');
            }

            return true;
        }

    };

    if(!hasVote){
        const addUserVoteData = await addUserVote(postId, captionId);

        if(!addUserVoteData) {
            throw new Error('failed to create userVote');
        };

        const upVoteData = await changeVote(caption, 'increase');

        if(!upVoteData) {
            throw new Error('failed to increase caption vote for initial vote.');
        };

        return true;
    }
};

export const voteStyleFinder = async (user, caption) => {
    console.log(caption.user._id, user._id, 'here')
    if(caption.user._id === user._id){
        return('voteBtnDisabled');
    };
    if(user.votes.length === 0) {
        return('voteBtnOn');
    };
    for (let i = 0; i < user.votes.length; i++) {
        if(user.votes[i].voteCaption === caption._id){
            return('voteBtnOff');
        };
    };

    return('voteBtnOn');
};