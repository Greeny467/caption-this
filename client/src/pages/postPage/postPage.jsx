import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { SINGLE_POST } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import CommentSection from '../../components/commentSection';

export default function PostPage() {
  const { postId } = useParams();
  console.log(postId);

  const [post, setPost] = useState(undefined);
  const [pageType, setPageType] = useState('post');

  const { loading, error, data } = useQuery(SINGLE_POST, {
    variables: {
      requestedPostId: postId,
    },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      console.log(data.singlePost);
      setPost(data.singlePost);
    }
  }, [loading, error, data]);

  const handlePageTypeChange = () => {
    if (pageType === 'post') {
      setPageType('vote');
    } else {
      setPageType('post');
    }
  };

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
  }

  if (error || !post) {
    return <h1>Error loading post</h1>;
  }

  return (
    <>
      <a id='backbutton' href='/'>
        Back
      </a>
      <input
        type='checkbox'
        id='pageTypeToggle'
        checked={pageType === 'vote'}
        onChange={handlePageTypeChange}
      />
      {pageType === 'post' && (
        <div>
          <section>
            <a href={`/dashboard/${post.user._id}`}>{post.user.username}</a>
            <h3>Other info?</h3>
          </section>
          <section>
            <img src={post.imageURL} />
            <div>
              {post.caption !== null ? (
                <>
                  <a href={`/dashboard/${post.caption.user._id}`}>
                    {post.caption.user.username}
                  </a>
                  <h4>{post.caption.text}</h4>
                </>
              ) : (
                <p>Caption hasn't been chosen yet</p>
              )}
            </div>
          </section>
          <CommentSection post={post} />
        </div>
      )}
      {pageType === 'vote' && (
        <div>
          <a href='/' id='backButton'>
            Back
          </a>
          <input
            type='checkbox'
            id='pageTypeToggle'
            checked={pageType === 'vote'}
            onChange={handlePageTypeChange}
          />
          <section>
            <a href={`/dashboard/${post.user._id}`}>{post.user.username}</a>
            <h3>Other info?</h3>
          </section>
          <section>
            <img src={post.imageURL} />
            {post.caption !== null ? (
              <div>
                <a href={`/dashboard/${post.caption.user._id}`}>
                  {post.caption.user.username}
                </a>
                <h4>{post.caption.text}</h4>
              </div>
            ) : (
              <div>
                <p>Caption hasn't been chosen yet</p>
              </div>
            )}
          </section>
          <section>
            <h1>leaderboard component here</h1>
          </section>
        </div>
      )}
    </>
  );
}