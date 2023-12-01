import vote from '../utils/vote';
import { voteStyleFinder } from '../utils/vote';

import { useState, useQuery } from 'react';
import { GET_ME } from '../utils/queries';

export default function Comment ({item, type}) {

    const [user, setUser] = useState({});
    const currentUser = useQuery(GET_ME);
    useEffect(() => {
        const fetchData = async () => {
          const currentUserData = await currentUser;
          setUser(currentUserData);
        };
    
        fetchData();
    }, [currentUser]);

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
    

    if(type === 'comment') {
        return(
            <>
                <div>
                    <a href={`/dashboard/${item.user._id}`}>{item.user.username}</a>
                    <p>{item.createdAt}</p>
                    <p>{item.text}</p>
                </div>
            </>
        );
    }
    else if(type === 'caption') {
        return(
            <>
                <div>
                    <p>{item.user.username}</p>
                    <p>{item.createdAt}</p>
                    <p>{item.text}</p>
                    <p>Votes: {item.likes}</p>
                    <button className={voteStyle} onClick={voteHandler} >Vote</button>
                </div>
            </>
        );
    };
};