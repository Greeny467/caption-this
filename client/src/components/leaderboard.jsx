
import Comment from'./comment';

import { useState, useEffect } from 'react';
import { sortCaptionsDescending } from '../utils/sortCaptions';


export default function Leaderboard (post, user){
    const [captionType, setCaptionType] = useState('caption');
    const [captions, setCaptions] = useState([]);

    const captionFilled = post.caption !== null;
    const postCaptions = post.captions;

    useEffect(() => {
        if(captionFilled === true) {
            setCaptionType('comment');
        };

        setCaptions(sortCaptionsDescending(postCaptions));
    }, [captionFilled, postCaptions]);

    return(
        <>
            <div>
                <h1>leaderboard</h1>
                <section>
                    {captions.map((caption, index) => (
                        <div>
                            <h4>{index}</h4>
                            <Comment item={caption} type={captionType}/>
                        </div>
                    ))}
                </section>
            </div>
        </>
    )
}