import React, { useState, useEffect, useRef } from "react";


export default function Timer({
  duration,
  setCountTime,
}) {
  const [secondsRemaining, setSecondsRemaining] = useState(duration * 60);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  useInterval(() => {
    if (secondsRemaining > 0) {
      setSecondsRemaining(secondsRemaining - 1);
    }
    setCountTime(0);
  }, 1000);

  useEffect(() => {
    if (secondsRemaining === 0) {
      setCountTime(0);
      document.getElementById("submit_test_form").click();
    }
  }, [secondsRemaining]);

  return (
    <div className="App">
      <div style={{ padding: 10 }}>
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </div>
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    } else {
    }
  }, [delay]);
}

const twoDigits = (num) => String(num).padStart(2, "0");
