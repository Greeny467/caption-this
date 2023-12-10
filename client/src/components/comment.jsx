import vote from '../utils/vote';
import { voteStyleFinder } from '../utils/vote';

import { useState } from 'react';
import { useQuery, useEffect } from '@apollo/client';
import { GET_ME } from '../utils/queries';

export default function Comment ({item, type}) {

    const [user, setUser] = useState({});
    const {loading, error, data} = useQuery(GET_ME);

    useEffect(() => {
        const fetchData = async () => {
          setUser(data);
        };
        
        if(!loading && !error && data){
            fetchData();
        }
        else if (error){
            console.log(error);
        };

    }, [loading, error, data]);

    const voteHandler = () => {
        const updatedUser = vote(currentUser, item);
        
        if(!updatedUser) {
            console.error('something went wrong voting: failed to vote');
        }
        else {
            setUser(updatedUser);
        };
    };

    const [voteStyle, setVoteStyle] = useState(voteStyleFinder(user, item));
    
    return(
        <>
            <div>
                <a href={`/dashboard/${item.user._id}`}>{item.user.username}</a>
                <p>CreatedAt here</p>
                <p>{item.text}</p>
                {type === 'caption' && (
                    <>
                        <p>Votes: {item.likes}</p>
                        <button className={voteStyle} onClick={voteHandler}>Vote</button>
                    </>
                )}
            </div>
        </>
    )

};