import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { SINGLE_POST } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import CommentSection from '../../components/commentSection';

export default function PostPage() {
  const { postId } = useParams();
  console.log(postId);

  const [pageType, setPageType] = useState('post');

  const { loading, error, data } = useQuery(SINGLE_POST, {
    variables: {
      requestedPostId: postId,
    },
  });

  const handlePageTypeChange = () => {
    if (pageType === 'post') {
      setPageType('vote');
    } else {
      setPageType('post');
    }
  };

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <h1>Error loading post: {error}</h1>;
  }

  if(!data){
    return <h1>No post..?</h1>
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
            <a href={`/dashboard/${data.singlePost.user._id}`}>{data.singlePost.user.username}</a>
            <h3>Other info?</h3>
          </section>
          <section>
            <img src={data.singlePost.imageURL} />
            <div>
              {data.singlePost.caption !== null ? (
                <>
                  <a href={`/dashboard/${data.singlePost.caption.user._id}`}>
                    {data.singlePost.caption.user.username}
                  </a>
                  <h4>{data.singlePost.caption.text}</h4>
                </>
              ) : (
                <p>Caption hasn't been chosen yet</p>
              )}
            </div>
          </section>
          <CommentSection post={data.singlePost} />
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
            <a href={`/dashboard/${data.singlePost.user._id}`}>{data.singlePost.user.username}</a>
            <h3>Other info?</h3>
          </section>
          <section>
            <img src={data.singlePost.imageURL} />
            {data.singlePost.caption !== null ? (
              <div>
                <a href={`/dashboard/${data.singlePost.caption.user._id}`}>
                  {data.singlePost.caption.user.username}
                </a>
                <h4>{data.singlePost.caption.text}</h4>
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