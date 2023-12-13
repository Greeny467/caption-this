import vote from '../utils/vote';
import { voteStyleFinder } from '../utils/vote';

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
            console.log(error);
        };

    }, [loading, error, data]);

    useEffect(() => {
        if (!loading && !error && data) {
            console.log('USER', user, data, item);
            if (user && user.votes && Array.isArray(user.votes) && user.votes.length > 0) {
                setVoteStyle(voteStyleFinder(user, item));
            }
            else if (user && user.votes && Array.isArray(user.votes) && user.votes.length === 0){
                setVoteStyle('voteBtnOn');
            };
        }
    }, [loading, error, data, user]);

    const voteHandler = async () => {
        if(user && user.votes && Array.isArray(user.votes)) {
            const updatedUser = await vote(user, item);
        
            if(!updatedUser) {
                console.error('something went wrong voting: failed to vote');
            }
            else {
                setUser(updatedUser);
            };
        }
        else{
            console.error('issue with user.votes Array');
        }
    };

    
    
    return(
        <>
            <div>
                <a href={`/dashboard/${item.user._id}`}>{item.user.username}</a>
                <p>CreatedAt here</p>
                <p>{item.text}</p>
                {type === 'caption' && (
                    <>
                        <p>Votes: {item.votes}</p>

                        { voteStyle === 'voteBtnOn' && (
                            <button onClick={voteHandler}>Vote</button>
                        )}
                        
                    </>
                )}
            </div>
        </>
    )

};