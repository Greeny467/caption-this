import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { SINGLE_POST } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import CommentSection from '../../components/commentSection';
import Leaderboard from '../../components/leaderboard';
import CountdownTimer from '../../components/timer';

export default function PostPage () {
    const {postId} = useParams();
    console.log(postId);

    const { loading, error, data } = useQuery(SINGLE_POST, {
        variables: {
          requestedPostId: postId
        },
    });

    const [post, setPost] = useState({
        user: {
            _id: 404,
            username:'placeholder'
        },
        imageURL: 'n/a',
        caption: null,
    });
    const [pageType, setPageType] = useState('post');

    

    useEffect(() => {
        if(error){
            console.error(error);
        }
        if (data && data.singlePost) {
            console.log(data.singlePost)
            setPost(data.singlePost);
        }
    }, [loading, error, data]);


    const handlePageTypeChange = () => {
        if(pageType === 'post') {
            setPageType('vote');
        }
        else{
            setPageType('post');
        };
    };

    const currentDate = new Date().getTime();


    return(
        <>
            {post !== undefined ? (
                <>
                    <a id='backbutton' href='/'>Back</a>
                    <button id='changePageType' onClick={handlePageTypeChange}>{pageType === 'post' ? (<>Vote</>): (<>Post</>)}</button>
                    <div>
                        <section>
                            <a href={`/dashboard/${post.user._id}`}>{post.user.username}</a>
                            <h3>Other info?</h3>
                        </section>
                        <section>
                            <img src={post.imageURL}/>
                            <div>
                                {post.caption !== null ? ( 
                                    <>
                                        <a href={`/dashboard/${post.caption.user._id}`}>{post.caption.user.username}</a>
                                        <h4>{post.caption.text}</h4>
                                    </>
                                    ):(
                                        <>
                                            {post.timerDate ? (
                                                <CountdownTimer futureDate={timerDate}/>
                                            ):(
                                                <p>Caption hasn't been chosesn yet</p>
                                            )}
                                        </>
                                    )
                                }
                            </div>
                        </section>
                        
                        {pageType === 'post' ? (
                            <>
                                {post.captions && Array.isArray(post.captions) && (
                                    <CommentSection item={post}/>
                                )}
                            </>
                        ):(
                            <Leaderboard post={post}/>
                        )}

                    </div>
                </>
            ):(
                <h1>Post Not Loaded</h1>
            )}
        
        
        
        </>
    );

    
}