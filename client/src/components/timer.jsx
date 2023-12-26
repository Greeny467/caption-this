import './components.scss';
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

    let time = timeDifference;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (time > 1000 * 60 * 60 * 24) {
      days = Math.floor(time / (1000 * 60 * 60 * 24));
      time %= 1000 * 60 * 60 * 24; 
    };

    if (time > 1000 * 60 * 60) {
      hours = Math.floor(time / (1000 * 60 * 60));
      time %= 1000 * 60 * 60;
    };

    if (time > 1000 * 60) {
      minutes = Math.floor(time / (1000 * 60));
      time %= 1000 * 60;
    };

    if (time > 1000) {
      seconds = Math.floor(time / 1000);
      time %= 1000;
    };

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

      <p>
        Time left until caption is set: <br/>
        {timeLeft.days && `${timeLeft.days} days, `}
        {timeLeft.hours && `${timeLeft.hours} hours, `}
        {timeLeft.minutes && `${timeLeft.minutes} minutes, and `}
        {timeLeft.seconds && `${timeLeft.seconds} seconds`}
      </p>
    </div>
  );
};

export default CountdownTimer;
