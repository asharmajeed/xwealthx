/* eslint-disable */
// src/components/Timer.js
import React, { useState, useEffect } from "react";

const Timer = ({ onTimeOver }) => {
  const [time, setTime] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          onTimeOver();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onTimeOver]);

  return (
    <div className="text-right text-lg font-medium text-gray-700">
      Time left: {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}
    </div>
  );
};

export default Timer;
