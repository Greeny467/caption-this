
const { User, Post, Caption, Comment } = require('../models');
const auth = require('../utils/auth');
const {signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                return User.findOne({ _id: context.user._id }).populate(['posts', 'captions', 'comments']);
            }
            throw new AuthenticationError('you need to be logged in');
        },
        allPosts: async (parent, args, context) => {
            try {
                return Post.find().populate(['user', 'captions', 'comments']);
            } catch (error) {
                console.error(error);
                throw new Error('failed to get all posts');
            }
        },
        singlePost: async (parent, {requestedPostId}, context) => {
            try {
                return Post.findOne({_id: requestedPostId}).populate([ 'captions', 'comments']);
            } catch (error) {
                console.error(error);
                throw new Error('failed to get singular post');
            }
        },
        user: async (parent, {requestedUserId}, context) => {
            try {
                return User.findOne({_id: requestedUserId}).populate(['posts', 'captions', 'comments']);
            } catch (error) {
                console.error(error);
                throw new Error('failed to find user');
            }
        },
        singleCaption: async (parent, {captionId}, context) => {
            try{
                const caption = await Caption.findById(captionId);

                if(!caption){
                    throw new Error('failed to find single caption');
                }

                return caption;
            }
            catch (error) {
                console.error(error);
                throw new Error('failed to find single caption entirely');
            }
        }
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('no account under this email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('incorrect password');
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, {username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },



        addPost: async (parent, { post }, context) => {
            try{
                if(context.user) {

                    const createdPost = await Post.create({ post });

                    if(!createdPost) {
                        throw new AuthenticationError('failed to create post');
                    }

                    await User.findOneAndUpdate(
                        { _id: context.user._id},
                        { $addToSet: {posts: post._id} }
                    );

                    return createdPost;
                }
                else {
                    throw new AuthenticationError('you need to be logged in');
                }
            }
            catch (error){
                console.error(error);
                throw new Error('failed to create post entirely');
            };
        },
        addCaption: async (parent, { caption }, context) => {
            try {
                if(context.user) {
                    const newCaption = await Caption.create({ caption });

                    if(!newCaption) {
                        throw new AuthenticationError('failed to create caption');
                    }

                    try {
                        await User.findOneAndUpdate(
                            { _id: context.user._id},
                            { $addToSet: {captions: newCaption._id}}
                        );
                        await Post.findOneAndUpdate(
                            { _id: newCaption.postId},
                            { $addToSet: {captions: newCaption._id}}
                        );
                    } catch (error) {
                        console.error(error);
                        throw new Error(error);
                    };
                    
                    return newCaption;
                }
                else{
                    throw new AuthenticationError('you need to be logged in');
                };
            } catch (error) {
                console.error(error);
                throw new Error('failed to create caption entirely');
            };
        },
        addComment: async (parent, { comment }, context) => {
            try {
                if(context.user) {
                    const newComment = Comment.create({ comment });

                    if(!newComment) {
                        throw new AuthenticationError('failed to create comment');
                    }

                    try {
                        await User.findOneAndUpdate(
                            { _id: context.user._id},
                            { $addToSet: {comments: newComment._id}}
                        );
                        await Post.findOneAndUpdate(
                            { _id: newComment.postId},
                            { $addToSet: {comments: newComment._id}}
                        );
                    } catch (error) {
                        console.error(error);
                        throw new Error(error);
                    };


                    return newComment;
                }
                else{
                    throw new AuthenticationError('you need to be logged in');
                };
            } catch (error) {
                console.error(error);
                throw new Error('failed to create comment entirely');
            };
        },


        captionVote: async (parent, { caption, update}, context) => {
            try {
                if(context.user){
                    let updateNumber;
                    if(update === 'increase'){
                        updateNumber = caption.likes + 1;
                    }
                    else if (update === 'decrease'){
                        updateNumber = caption.likes - 1;
                    };

                    const updatedCaption = await Caption.findOneAndUpdate(
                        {_id: caption._id},
                        {likes: updateNumber},
                        {new: true}
                    );

                    if(!updatedCaption) {
                        throw new AuthenticationError('failed to update captionVote')
                    }

                    return updatedCaption;
                }
                else{
                    throw new AuthenticationError('you have to be logged in');
                };
            } catch (error) {
                console.error(error);
                throw new Error('failed to update caption vote entirely');
            };
        },
        addUserVote: async (parent, {postId, captionId}, context) => {
            try {
                if(context.user){
                    const user = await User.findById(context.user._id);
                    if(user.votes.some((vote) => vote.votePost === postId && vote.voteCaption === captionId)){
                        throw new Error('vote already exists');
                    }

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: {votes: {
                            votePost: postId,
                            voteCaption: captionId
                        }}},
                        { new: true }
                    ).populate(['posts', 'captions', 'votes']);

                    if(!updatedUser){
                        throw new Error('failed to create vote');
                    }

                    return updatedUser;

                }
                else{
                    throw new AuthenticationError('you have to be logged in');
                }
            } catch (error) {
                console.error(error);
                throw new Error('failed to add vote entirely');
            }
        },
        removeUserVote: async (parent, {postId, captionId}, context) => {
            try {
                if(context.user){
                    const user = await User.findById(context.user._id);

                    if(!user){
                        throw Error('failed to find user');
                    }

                    if(!user.votes.some((vote) => vote.votePost === postId && vote.voteCaption === captionId)){
                        throw Error('vote does not exist');
                    }

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id},
                        { $pull: {votes: {
                            votePost: postId,
                            voteCaption: captionId
                        }}},
                        { new: true}
                    ).populate(['posts', 'captions', 'votes']);

                    if(!updatedUser){
                        throw new Error('failed to remove vote');
                    }

                    return updatedUser
                }
                else{
                    throw new AuthenticationError('you have to be logged in');
                }
            } catch (error) {
                console.error(error);
                throw new Error('failed to remove vote entirely');
            };
        }


        

    }
};

module.exports = { resolvers };