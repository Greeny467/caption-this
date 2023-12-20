require('dotenv').config();
const schedule = require('node-schedule');
const { User, Post, Caption, Comment } = require('../models');
require('mongoose');
const {signToken} = require('../utils/auth');
const findTopCaption = require('../utils/findTopCaption');


const {GraphQLScalarType, Kind} = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const resolvers = {
    Date: dateScalar,
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const user = await User.findOne({ _id: context.user._id }).populate([
                    { path: 'posts', populate: { path: 'user' } },
                    'captions', 
                    'comments'
                ]);

                return user;
            }
            throw new Error('you need to be logged in');
        },



        allPosts: async (parent, args) => {
            try {
                return Post.find().populate([ 'user', 'caption', 'captions', 'comments']);
            } catch (error) {
                console.error(error);
                throw new Error('failed to get all posts');
            }
        },
        singlePost: async (parent, {requestedPostId}) => {
            try {
                const post = await Post.findOne({_id: requestedPostId}).populate(['user', 'caption', 'captions', 'comments']);
                return post
            } catch (error) {
                console.error(error);
                throw new Error('failed to get singular post');
            }
        },



        user: async (parent, {requestedUserId}) => {
            try {

                const user = await User.findOne({_id: requestedUserId}).populate([
                    { path: 'posts', populate: { path: 'user' } }, 
                    'captions', 
                    'comments'
                ]);
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
                    console.log(createdPost)
                    if(!createdPost) {
                        throw new Error('failed to create post');
                    }

                    const updateUser = await User.findOneAndUpdate(
                        { _id: post.user},
                        { $addToSet: {posts: createdPost._id} }
                    );

                    if(!updateUser) {
                        throw new Error(`failed to update user ${post.user}`);
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
                    if(caption.votes === null) {
                        updateNumber = 1;
                    }
                    else if(update === 'increase'){
                        updateNumber = caption.votes + 1;
                    }
                    else if (update === 'decrease'){
                        updateNumber = caption.votes - 1;
                    };

                    const updatedCaption = await Caption.findOneAndUpdate(
                        {_id: caption._id},
                        {votes: updateNumber},
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
                    ).populate([{ path: 'posts', populate: { path: 'user' } }, 'captions', 'comments']);

                    if(!updatedUser){
                        throw new Error('failed to create vote');
                    }

                    return updatedUser;

                }
                else{
                    throw new Error('you have to be logged in');
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

                    if(!user.votes.some((vote) => JSON.stringify(vote.votePost) === JSON.stringify(postId) && JSON.stringify(vote.voteCaption) === JSON.stringify(captionId))){
                        throw Error('vote does not exist');
                    }

                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id},
                        { $pull: {votes: {
                            votePost: postId,
                            voteCaption: captionId
                        }}},
                        { new: true}
                    ).populate([{ path: 'posts', populate: { path: 'user' } }, 'captions', 'comments']);

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
            console.log(time, post)

            const scheduleJob = async (time, post) => {
                const timeInMilliseconds = time * 60 * 1000;
                const scheduledTime = new Date(Date.now() + timeInMilliseconds);
                console.log('scheduledTime:', scheduledTime);
            
                schedule.scheduleJob({ start: new Date(scheduledTime) }, async () => {
                    console.log('scheduled event happening');
                    const currentPost = await Post.findById(post).populate('captions');
                    const captions = currentPost.captions;
            
                    if (captions.length === 0) {
                        const lastDate = new Date(currentPost.timerDate);
                        const newDate = new Date(lastDate.getTime() + time * 60 * 1000);
            
                        const updatePost = await Post.findByIdAndUpdate(post, { timerDate: newDate });
                        
            
                        if (!updatePost) {
                            throw new Error('failed to reset post timer');
                        }

                        scheduleJob(time, post);
                    } else {
                        const topCaption = findTopCaption(captions);
            
                        const updatedPost = await Post.findByIdAndUpdate(post, { $set: { caption: topCaption._id } });
            
                        if (!updatedPost) {
                            console.error('failed to update post with new caption. Post in question:', post);
                        } else {
                            console.log('succeeded in updating post with new caption. Post in question:', post);
                        }
                    }
                });
            };
            
            try {
                // Schedule the job for the first time
                scheduleJob(time, post);
            
                return {
                    success: true,
                    message: 'succeeded in setting timed caption update'
                };
            } catch (error) {
                console.error(error);
            
                return {
                    success: false,
                    message: error
                };
            }
            
        }
        

    }
};

module.exports = resolvers;