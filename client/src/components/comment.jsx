import './components.scss';

import vote from '../utils/vote';
import { voteStyleFinder } from '../utils/vote';

import AUTH from '../utils/auth';

import { useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

export default function Comment ({item, type}) {

    const [user, setUser] = useState({});
    const [voteStyle, setVoteStyle] = useState('');

    const {loading, error, data} = useQuery(GET_ME);

    useEffect(() => {
        const fetchData = async () => {
          setUser(data.me);
        };
        
        if(!loading && !error && data){
            fetchData();
        }
        else if (error){
            console.error(error);
        };

    }, [loading, error, data]);

    useEffect(() => {
        if (user !== null && user !== undefined) {
            if (user && user.votes && Array.isArray(user.votes)) {
                const setVote = async () => {
                    const newVoteStyle = await voteStyleFinder(user, item);
                    setVoteStyle(newVoteStyle)
                };

                setVote();
            }
        }
    }, [loading, error, data, user]);

    const voteHandler = async () => {
        if(user && user.votes && Array.isArray(user.votes)) {
            const userVote = await vote(user, item);

            if(userVote === true) {
                return;
            }
            else{
                console.error('something went wrong voting');
            }
        }
        else{
            console.error('issue with user.votes Array');
        }
    };

    
    
    return(
        <>
            <div className='comment'>
                <a className='userName' href={`/dashboard/${item.user._id}`}>{item.user.username}</a>
                <p>CreatedAt here</p>
                <p>{item.text}</p>
                {type === 'caption' && (
                    <>
                        <p>Votes: {item.votes}</p>

                        {AUTH.loggedIn() ? (
                            <>
                                {voteStyle !== 'voteBtnDisabled' && (
                                    <>
                                        { voteStyle === 'voteBtnOn' ? (
                                            <button className={voteStyle} onClick={voteHandler}>Vote</button>
                                        ):(
                                            <button className={voteStyle} onClick={voteHandler}>Remove Vote</button>
                                        )}
                                    </>
                                )}
                            </>
                        ):(
                            <p>Login to vote!</p>
                        )}
                        
                    </>
                )}
            </div>
        </>
    )

};