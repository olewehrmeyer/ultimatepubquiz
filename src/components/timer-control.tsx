import React, { useEffect, useState } from "react";
import Timer from "./timer";

interface ITimerControlProps {
  countdownFrom: number;
}

const TimerControl: React.FC<ITimerControlProps> = ({ countdownFrom }) => {

    const [remainingTime, setRemainingTime] = useState(countdownFrom);

    useEffect(() => {
        if (remainingTime <= 0) {
          return;
        }
        const timer = setInterval(() => {
          setRemainingTime(rt => rt - 1);
        }, 1000);
        return () => clearInterval(timer);
      });

  return (
    <Timer total={countdownFrom} remaining={remainingTime}></Timer>
  );
};

export default TimerControl;
