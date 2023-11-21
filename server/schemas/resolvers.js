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



        addPost: async (parent, { post: postData }, context) => {
            try{
                if(context.user) {
                    const post = await Post.create({ postData });

                    if(!post) {
                        throw new AuthenticationError('failed to create post');
                    }

                    await User.findOneAndUpdate(
                        { _id: context.user._id},
                        { $addToSet: {posts: post._id} }
                    );

                    return post;
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
        addCaption: async (parent, { caption: captionData }, context) => {
            try {
                if(context.user) {
                    const caption = Caption.create({ captionData });

                    if(!caption) {
                        throw new AuthenticationError('failed to create caption');
                    }

                    try {
                        await User.findOneAndUpdate(
                            { _id: context.user._id},
                            { $addToSet: {captions: caption._id}}
                        );
                        await Post.findOneAndUpdate(
                            { _id: captionData.postId},
                            { $addToSet: {captions: caption._id}}
                        );
                    } catch (error) {
                        console.error(error);
                        throw new Error(error);
                    };
                    
                    return caption;
                }
                else{
                    throw new AuthenticationError('you need to be logged in');
                };
            } catch (error) {
                console.error(error);
                throw new Error('failed to create caption entirely');
            };
        },
        addComment: async (parent, { comment: commentData }, context) => {
            try {
                if(context.user) {
                    const comment = Comment.create({ commentData });

                    if(!comment) {
                        throw new AuthenticationError('failed to create comment');
                    }

                    try {
                        await User.findOneAndUpdate(
                            { _id: context.user._id},
                            { $addToSet: {comments: comment._id}}
                        );
                        await Post.findOneAndUpdate(
                            { _id: commentData.postId},
                            { $addToSet: {comments: comment_id}}
                        );
                    } catch (error) {
                        console.error(error);
                        throw new Error(error);
                    };


                    return comment;
                }
                else{
                    throw new AuthenticationError('you need to be logged in');
                };
            } catch (error) {
                console.error(error);
                throw new Error('failed to create comment entirely');
            };
        },


        captionVote: async (parent, {caption: captionData, update}, context) => {
            try {
                if(context.user){
                    let updateNumber;
                    if(update === 'increase'){
                        updateNumber = captionData.likes + 1;
                    }
                    else if (update === 'decrease'){
                        updateNumber = captionData.likes - 1;
                    };

                    const updatedCaption = Caption.findOneAndUpdate(
                        {_id: captionData._id},
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
        }


        

    }
}