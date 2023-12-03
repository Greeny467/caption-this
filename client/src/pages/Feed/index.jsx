import './Feed.scss';
import Auth from '../../utils/auth';

import Post from '../../components/Post';

import { ALL_POSTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

export default function Feed() {
  const { loading, error, data } = useQuery(ALL_POSTS);
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching posts:', error);
    }

    if (data && data.allPosts) {
      setFeedData(data.allPosts);
    }
  }, [data, error]);

  return (
    <div className="feed_container">
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Something went wrong.</h1>
      ) : feedData.length > 0 ? (
        feedData.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <h1>There aren't any posts yet.</h1>
      )}
    </div>
  );
}
