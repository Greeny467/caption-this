import './components.scss';

import Comment from './comment';
import { useState, useEffect } from 'react';
import { sortCaptionsDescending } from '../utils/sortCaptions';

export default function Leaderboard({ post }) {
  const [captionType, setCaptionType] = useState('caption');
  const [captions, setCaptions] = useState([]);
  const [placement, setPlacement] = useState(0);

  const captionFilled = post.caption !== null;
  const postCaptions = post.captions;

  useEffect(() => {
    if (captionFilled) {
      setCaptionType('comment');
    }

    setCaptions(sortCaptionsDescending(postCaptions));
  }, [captionFilled, postCaptions]);

  const handleIncreasePlacement = () => {
    setPlacement(placement + 10);
  };

  const handleDecreasePlacement = () => {
    setPlacement(placement - 10);
  };

  return (
    <>
      <div className='leaderboard'>
        <h1>leaderboard</h1>
        <section>
          {captions.slice(placement, placement + 10).map((caption, index) => (
            <div key={caption._id}>
              <h4>{index}</h4>
              <Comment item={caption} type={captionType} />
            </div>
          ))}
        </section>
        <button onClick={() => setPlacement(0)}>Go to Top</button>
        {placement >= 10 && (
          <button onClick={handleDecreasePlacement}>up</button>
        )}
        {placement <= captions.length - 10 && (
          <button onClick={handleIncreasePlacement}>down</button>
        )}
      </div>
    </>
  );
}
