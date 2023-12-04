import Comment from './comment';

import Auth from '../utils/auth';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAPTION, ADD_COMMENT } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

import { sortCaptionsCommentSection } from '../utils/sortCaptions';

export default function CommentSection(post) {
  const isComments = post.caption !== null;

  const hasComments = post.comments.length !== 0;
  const hasCaptions = post.captions.length !== 0;


  const [inputText, setInputText] = useState('');
  const [user, setUser] = useState({});
  const [addCaption, { captionError }] = useMutation(ADD_CAPTION);
  const [addComment, { commentError }] = useMutation(ADD_COMMENT);
  const { loading, error, data } = useQuery(GET_ME);

  useEffect(() => {
    if(Auth.loggedIn){
      if (!loading && !error) {
        setUser(data);
      }
    }
  }, [loading, error, data]);

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitCaptionHandler = async () => {
    const newCaption = await addCaption({
      variables: {
        text: inputText,
        user: user,
        postId: post._id,
      },
    });

    if (!newCaption) {
      console.error('Failed to submit new caption');
    }

    setInputText('');
  };

  const submitCommentHandler = async () => {
    const newComment = await addComment({
      variables: {
        text: inputText,
        user: user,
        postId: post._id,
      },
    });

    if (!newComment) {
      console.error('Failed to submit new Comment');
    }

    setInputText('');
  };

  const commentForm = () => {
    const loggedInUser = Auth.loggedIn();

    if (loggedInUser) {
      return (
        <form>
          <input
            onChange={textHandler}
            id="commentText"
            name="commentText"
            value={inputText}
          ></input>
          <button name="submit" id="submit" onClick={submitCommentHandler}>
            Submit
          </button>
        </form>
      );
    }

    if (!loggedInUser) {
      return <h1>Login to add a comment</h1>;
    }
  };

  const captionForm = () => {
    const loggedInUser = loggedIn();

    if (loggedInUser) {
      const hasCaption = user.captions.some((caption) => ( caption.postId === post._id));

      if (!hasCaption) {
        return (
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
        );
      }

      return null;
    }

    if (!loggedInUser) {
      return <h1>Login to create a caption</h1>;
    }
  };



  const sortedCaptions = sortCaptionsCommentSection(post.captions, user._id);

  if (!isComments) {
    return (
      <>
        <h2>Comments</h2>
        <div>
          {commentForm()}
          <section>
            {hasComments === true && post.comments.map((comment) => (
              <Comment key={comment.id} item={comment} type="comment" />
            ))}
          </section>
        </div>
      </>
    );
  };

  if (isComments) {
    return (
      <>
        <h2>Captions</h2>
        <div>
          {captionForm()}
          <section>
            {hasCaptions === true && sortedCaptions.map((caption) => (
              <Comment key={caption.id} item={caption} type="caption" />
            ))}
          </section>
        </div>
      </>
    );
  };
};
  