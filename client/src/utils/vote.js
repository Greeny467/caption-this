import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER_VOTE, REMOVE_USER_VOTE, ADD_VOTE } from './mutations';
// create new query to find caption by id and import it


export default async function vote (user, caption) {

    const [addUserVote, {addVoteError}] = useMutation(ADD_USER_VOTE);
    const [removeUserVote, {removeVoteError}] = useMutation(REMOVE_USER_VOTE);
    const [changeVote, {voteError}] = useMutation(ADD_VOTE);

    

    const captionId = caption._id;
    const postId = caption.postId;

    const voteExists = user.votes.some((vote) => vote.votePost === postId && vote.voteCaption === captionId);
    const hasVote = user.votes.some((vote) => vote.votePost === postId);

    if(voteExists){
        return;
    }

    if(hasVote){
        const existingVote = user.votes.find((vote) => vote.votePost === postId);
        // use new caption(id) query to get the old caption

        const {downVoteData} = await changeVote({
            variables: {
                caption: {
                    // oldCaption query return data
                },
                update: 'decrease'
            }
        })

    }
}