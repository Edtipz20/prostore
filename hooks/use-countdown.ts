// hooks/use-countdown.ts
import { useEffect, useState } from "react";

type CountdownResult = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeRemaining = (targetDate: Date): CountdownResult => {
  const timeDifference = Math.max(Number(targetDate) - Date.now(), 0);
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

export function useCountdown(targetDate: Date) {
  const [time, setTime] = useState<CountdownResult>();

  useEffect(() => {
    setTime(calculateTimeRemaining(targetDate));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(targetDate);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval); // fixed cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate.getTime()]);

  return time;
}
