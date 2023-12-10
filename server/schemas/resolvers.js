require('dotenv').config();
const schedule = require('node-schedule');
const { default: mongoose } = require('mongoose');
const { User, Post, Caption, Comment } = require('../models');
require('mongoose');
const {signToken} = require('../utils/auth');
const findTopCaption = require('../utils/findTopCaption');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const user = await User.findOne({ _id: context.user._id }).populate(['posts', 'captions', 'comments']);

                return user;
            }
            throw new Error('you need to be logged in');
        },



        allPosts: async (parent, args) => {
            try {
                return Post.find().populate([ 'user', 'captions', 'comments']);
            } catch (error) {
                console.error(error);
                throw new Error('failed to get all posts');
            }
        },
        singlePost: async (parent, {requestedPostId}) => {
            try {
                const post = findOne({_id: requestedPostId});
                console.log(post);
                
                return Post.findOne({_id: requestedPostId}).populate(['user', 'captions', 'comments']);
            } catch (error) {
                console.error(error);
                throw new Error('failed to get singular post');
            }
        },



        user: async (parent, {requestedUserId}) => {
            try {
                const simpleUser = await User.findOne({_id: requestedUserId});
                console.log(simpleUser);

                const user = await User.findOne({_id: requestedUserId}).populate(['posts', 'captions', 'comments']);
                console.log(user);
                return user;
            } catch (error) {
                console.error(error);
                throw new Error('failed to find user');
            }
        },
        singleCaption: async (parent, {captionId}) => {
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
                throw new Error('no account under this email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new Error('incorrect password');
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

                    const createdPost = await Post.create(post);

                    if(!createdPost) {
                        throw new Error('failed to create post');
                    }

                    const updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id},
                        { $addToSet: {posts: post._id} }
                    );

                    if(!updateUser) {
                        throw new Error(`failed to update user ${context.user._id}`);
                    }

                    const newPost = Post.findById(createdPost._id).populate('user');
                    return newPost;
                }
                else {
                    throw new Error('Could not authenticate user.');
                    
                }
            }
            catch (error){
                console.error(error);
                throw new Error('failed to create post entirely');
            };
        },
        addCaption: async (parent, { caption }, context) => {
            console.log(caption)
            try {
                if(context.user) {
                    const newCaption = await Caption.create(caption);

                    if(!newCaption) {
                        throw new Error('failed to create caption');
                    }

                    try {
                        await User.findOneAndUpdate(
                            { _id: caption.user},
                            { $addToSet: {captions: newCaption._id}}
                        );
                        await Post.findOneAndUpdate(
                            { _id: caption.postId},
                            { $addToSet: {captions: newCaption._id}}
                        );
                    } catch (error) {
                        console.error(error);
                        throw new Error(error);
                    };
                    
                    const response = {
                        _id: newCaption._id,
                        text: newCaption.text,
                        user: newCaption.user,
                        postId: newCaption.postId
                    };

                    return response;
                }
                else{
                    throw new Error('you need to be logged in');
                };
            } catch (error) {
                console.error(error);
                throw new Error('failed to create caption entirely');
            };
        },
        addComment: async (parent, { comment }, context) => {
            console.log(comment);
            try {
                if(context.user) {
                    const newComment = await Comment.create(comment);

                    if(!newComment) {
                        throw new Error('failed to create comment');
                    }

                    try {
                        await User.findOneAndUpdate(
                            { _id: comment.user},
                            { $addToSet: {comments: newComment._id}}
                        );
                        await Post.findOneAndUpdate(
                            { _id: comment.postId},
                            { $addToSet: {comments: newComment._id}}
                        );
                    } catch (error) {
                        console.error(error);
                        throw new Error(error);
                    };


                    const response = {
                        _id: newComment._id,
                        text: newComment.text,
                        user: newComment.user,
                        postId: newComment.postId

                    }
                    return response;
                }
                else{
                    throw new Error('you need to be logged in');
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
                        throw new Error('failed to update captionVote')
                    }

                    return updatedCaption;
                }
                else{
                    throw new Error('you have to be logged in');
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
                    throw new Error('you have to be logged in');Error
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
                    throw new Error('you have to be logged in');
                }
            } catch (error) {
                console.error(error);
                throw new Error('failed to remove vote entirely');
            };
        },
        setTimedCaption: async (parent, {time, post}) => {

            const scheduleJob = async () => {
                const timeInMilliseconds = time * 60 * 1000;
                schedule.scheduleJob({ start: Date.now() + timeInMilliseconds}, async () => {
                    const currentPost = await Post.findById(post).populate('captions');
                    const captions = currentPost.captions;
                    
                    if(captions.length === 0){
                        scheduleJob();
                    }
                    else{
                        const topCaption = findTopCaption(captions);

                        const updatedPost = await Post.findByIdAndUpdate(post, { $set: { caption: topCaption._id } });

                        if(!updatedPost) {
                            console.log('failed to update post with new caption. Post in question:', post);
                        }
                        else{
                            console.log('succeeded in updating post with new caption. Post in question:', post);
                        };
                    };

                });
            };
            try {
                scheduleJob();
                return({
                    success: true,
                    message: 'succeeded in setting timed caption update'
                });
            } catch (error) {
                console.error(error);
                return({
                    success: false,
                    message: error
                });
            }
        }
        

    }
};

module.exports = resolvers;