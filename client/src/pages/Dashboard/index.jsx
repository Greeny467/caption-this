import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import Post from '../../components/Post';
import Comment from '../../components/comment';


export default function Dashboard() {
  const { userId } = useParams();

  const [dashboardUser, setDashboardUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await useQuery(USER, {
          variables: {
            requestedUserId: userId,
          },
        });
  
        setDashboardUser(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData(); 
  }, [userId]);



  return (
    <>
      <div className="dashboard">
        <h1>{dashboardUser.username}'s Dashboard</h1>
        <div id='mainholder'>
          <section>
            <p> User info?</p>
          </section>
          <section>
            <div>
              <h3>Posts:</h3>
              {dashboardUser.posts.map((post) => (
                <Post post={post} user={dashboardUser}/>
              ))}
            </div>
            <div>
              <h3>Captions:</h3>
              {dashboardUser.captions.map((caption) => (
                <Comment item={caption} type='caption'/>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};