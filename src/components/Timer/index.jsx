import React, { useContext, useEffect, useState } from 'react';

import SapperContext from '../../context';

const Timer = () => {

  let { isFirstClick, isGameEnded, timer } = useContext(SapperContext)

  const [time, setTime] = useState(0)

  function incrementTimer() {
    setTime((prev) => prev + 1);
  }

  function startTimer() {
    timer.current = setInterval(incrementTimer, 1000);
  }

  function stopTimer() {
    clearInterval(timer.current)
  }

  useEffect(() => {
    if (isGameEnded) {
      stopTimer()
    }

    if (isFirstClick === true && !isGameEnded) {
      startTimer();
    }

    if (!isGameEnded && isFirstClick === null) {
      setTime(0)
    }
  }, [isFirstClick, isGameEnded])

  return (
    <div>
      {time}
    </div>
  );
}

export default Timer;