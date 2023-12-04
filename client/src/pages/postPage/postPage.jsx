import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { SINGLE_POST } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import CommentSection from '../../components/commentSection';

export default function PostPage () {
    const {postId} = useParams();
    console.log(postId);

    const { loading, error, data } = useQuery(SINGLE_POST, {
        variables: {
          requestedPostId: postId
        },
    });

    const [post, setPost] = useState(undefined);
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


    if(pageType === 'post') {
        return(
            <>
                {post !== undefined ? (
                    <>
                        <a id='backbutton' href='/'>Back</a>
                        <input type='checkbox' id='pageTypeToggle' checked={pageType === 'vote'} onClick={handlePageTypeChange}>pageType</input>
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
                                            <p>Caption hasn't been chosesn yet</p>
                                        )
                                    }
                                </div>
                            </section>
                            
        

                        </div>
                    </>
                ):(
                    <h1>Post Not Loaded</h1>
                )}
            
            
            
            </>
        );
    };

    if(pageType === 'vote') {
        return(
            <>
                {post !== undefined ? (
                    <>
                        <div>
                            <a href='/' id='backButton'>Back</a>
                            <input type='checkbox' id='pageTypeToggle' checked={pageType === 'vote'} onChange={handlePageTypeChange}>pageType</input>
                            <section>
                                <a href={`/dashboard/${post.user._id}`}>{post.user.username}</a>
                                <h3>Other info?</h3>
                            </section>
                            <section>
                            <img src={post.imageURL}/>
                            {post.caption !== null ?
                                (
                                    <div>
                                        <a href={`/dashboard/${post.caption.user._id}`}>{post.caption.user.username}</a>
                                        <h4>{post.caption.text}</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <p>Caption hasn't been chosen yet</p>
                                    </div>
                                )
                            }
                            </section>
                            <section>
                                <h1>leaderboard component here</h1>
                            </section>
                        
                        </div>
                    </>
                ):(
                    <h1>Post not loaded</h1>
                )}
            </>
        )
    }

    
}