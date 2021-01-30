import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Counter = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [session, setSession] = useState(false);
  const [state, setState] = useState('Başlat');

  useEffect(() => {
    if (session) {
      handleCounter();
    }
  });

  const handleCounter = () => {
    if (minutes === 0 && seconds === 0) {
      handlePlay();
    } else if (seconds === -1) {
      setMinutes(minutes - 1);
      setSeconds(59);
    } else {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  };

  const handlePlay = () => {
    if (session === false) {
      setSession(true);
      setState('Durdur');
    } else {
      setSession(false);
      setState('Başlat');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="timer-container">
        <div className="timer">
          <span> {minutes < 10 ? '0' + minutes : minutes} : </span>
          <span> {seconds < 10 ? '0' + seconds : seconds} </span>
        </div>
      </div>
      <Button className="m-3" size="sm" onClick={() => handlePlay()}>
        {state}
      </Button>
    </div>
  );
};

export default Counter;
