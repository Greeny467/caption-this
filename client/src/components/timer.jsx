import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ futureDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const timeDifference = futureDate - now;
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if(days !== 0){
        return {
            days,
            hours,
            minutes,
            seconds,
          };
    };
    if(hours !== 0){
        return {
            hours,
            minutes,
            seconds
        };
    };
    if(minutes !== 0){
        return {
            minutes,
            seconds
        };
    };

    if(seconds === 0){
        window.location.reload();
    }

    return {
        seconds
    };
  }

  return (
    <div>
      <p>Time Until Caption is Set:</p>
      {timeLeft.days && <p>{timeLeft.days} days,</p>}
      {timeLeft.hours && <p> {timeLeft.hours}:</p>}
      {timeLeft.minutes && <p>{timeLeft.minutes}:</p>}
      {timeLeft.seconds && <p>{timeLeft.seconds}</p>}
    </div>
  );
};

export default CountdownTimer;
