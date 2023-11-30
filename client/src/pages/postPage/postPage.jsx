import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { SINGLE_POST } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import Comment from '../../components/comment';
import CommentSection from '../../components/commentSection';

export default function postPage () {
    const postId = useParams();

    const [post, setPost] = useState(undefined);
    const [pageType, setPageType] = useState('post');

    useEffect(() => {
        const fetchData = async () => {
            try{
                const { data } = await useQuery(SINGLE_POST, {
                    variables: {
                        requestedPostId: postId
                    },
                });

                setPost(data.post);
            }
            catch (error){
                console.error('Error fetching post data:', error);
            };
        };

        fetchData();
    }, [postId]);


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
                <div>
                    <section>
                        <h2>{post.user.username}</h2>
                        <h3>Other info?</h3>
                    </section>
                    <section>
                        <img src={post.imageURL}/>
                        <div>
                            {post.caption !== null ? ( 
                                <>
                                    <h3>{post.caption.user.username}</h3>
                                    <h4>{post.caption.text}</h4>
                                </>
                                ):(
                                    <p>Caption hasn't been chosesn yet</p>
                                )
                            }
                        </div>
                    </section>
                    

                    <CommentSection post={post} />
                </div>
            
            
            
            </>
        );
    };

    if(pageType === 'vote') {
        return(
            <>
                <h2>{post.user.username}</h2>
                <h3>Other info?</h3>
                <img src={post.imageURL}/>
                {post.caption !== null ?
                    (
                        <div>
                            <h3>{post.caption.user.username}</h3>
                            <h4>{post.caption.text}</h4>
                        </div>
                    ) : (
                        <div>
                            <p>Caption hasn't been chosen yet</p>
                        </div>
                    )
                }

                <h1>Leaderboard component here</h1>
            </>
        )
    }

    
}