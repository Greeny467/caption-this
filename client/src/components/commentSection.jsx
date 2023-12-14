import Comment from './comment';

import Auth from '../utils/auth';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAPTION, ADD_COMMENT } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

import { sortCaptionsCommentSection } from '../utils/sortCaptions';

export default function CommentSection(item) {
  const post = item;
  const isComments = post.item.caption !== null;

  const [inputText, setInputText] = useState('');
  const [user, setUser] = useState({});
  const [addCaption, { captionError }] = useMutation(ADD_CAPTION);
  const [addComment, { commentError }] = useMutation(ADD_COMMENT);
  const { loading, error, data } = useQuery(GET_ME);

  useEffect(() => {
    if(Auth.loggedIn()){
      if (!loading && !error) {
        if(!data || data === undefined) {
          console.error('commentSection user query got bad response');
        }
        else{
          setUser(data.me);
        };
      };
    };
  }, [loading, error, data]);

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitCaptionHandler = async (e) => {
    e.preventDefault();
    const newCaption = await addCaption({
      variables: {
        caption: {
          text: inputText,
          user: {
            _id: user._id,
            username:user. username
          },
          postId: post.item._id
        }
      },
    });

    if (!newCaption) {
      console.error('Failed to submit new caption');
    }

    setInputText('');
  };

  const submitCommentHandler = async (e) => {
    e.preventDefault();

    const newComment = await addComment({
      variables: {
        comment: {
          text: inputText,
          user: {
            _id: user._id,
            username: user.username
          },
          postId: post.item._id,
        }
      },
    });

    if (!newComment) {
      console.error('Failed to submit new Comment');
    }

    setInputText('');
  };


  return(
    <>
      {isComments ? (
        <>
          {Auth.loggedIn() ?
            ( 
              <form>
                <input
                  onChange={textHandler}
                  id='commentText'
                  name='commentText'
                  value={inputText}
                ></input>
                <button name='submit' id='submit' onClick={submitCommentHandler}>Submit</button>
              </form>
            ):(
              <h1>Login to add a comment</h1>
            )
          }
          <section>
            {post.item.comments && Array.isArray(post.item.comments) && post.item.comments.map((comment) => (
              <>
                <Comment key={comment.id} item={comment} type="comment" />
              </>
            ))}
          </section>

        </>
      ):(
        <>
          {Auth.loggedIn() ? (
            <>
              {user.captions && Array.isArray(user.captions) && !user.captions.some((caption)=> caption.postId === post._id) ? (
                <>
                  <form>
                    <input
                      onChange={textHandler}
                      id="captionText"
                      name="captionText"
                      value={inputText}
                    ></input>
                    <button name="submit" id="submit" onClick={submitCaptionHandler}>
                      Submit
                    </button>
                  </form>
                </>
              ):(
                <>
                  <h3>You already made a caption for this post</h3>
                </>
              )}
            </>
          ):(
            <>
              <h3>Login to make a caption</h3>
            </>
          )}
          <section>
            {post.item.captions && Array.isArray(post.item.captions) && post.item.captions.map((caption) => (
              <Comment key={caption.id} item={caption} type="caption" />
            ))}
          </section>

        </>
      )}
    </>
  );
};
  