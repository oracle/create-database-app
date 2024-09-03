/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/* eslint-disable max-len */
import React from 'react';

const HOURS = 24;
const MINUTES = 60;
const SECONDS = 60;
const MILLISECONDS = 1000;

interface TimerProps {
  concertDate: string;
}

/**
 * The Timer Component.
 * @param props the Timer props.
 * @returns the Timer Component.
 */
function Timer(props: TimerProps) {
  const { concertDate } = props;
  const [time, setTime] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const updateCountdown = React.useCallback(() => {
    const now = new Date().getTime();
    let distance = new Date(concertDate).getTime() - now;
    let [days, hours, minutes, seconds] = [0, 0, 0, 0];
    if (distance > 0) {
      // Add 24 hours to adjust for DB date format.
      distance += MILLISECONDS * SECONDS * MINUTES * HOURS;
      days = Math.floor(distance / (MILLISECONDS * SECONDS * MINUTES * HOURS));
      hours = Math.floor(
        (distance % (MILLISECONDS * SECONDS * MINUTES * HOURS)) / (MILLISECONDS * SECONDS * MINUTES),
      );
      minutes = Math.floor((distance % (MILLISECONDS * SECONDS * MINUTES)) / (MILLISECONDS * SECONDS));
      seconds = Math.floor((distance % (MILLISECONDS * SECONDS)) / MILLISECONDS);
    }

    setTime({
      days,
      hours,
      minutes,
      seconds,
    });
  }, [concertDate]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      updateCountdown();
    }, MILLISECONDS);

    return () => clearInterval(interval);
  }, [updateCountdown]);

  return (
    <div className="flex basis-3/4 flex-row justify-evenly ">
      <div className="flex flex-col items-center">
        <span className="my-2 text-5xl font-bold tracking-widest">{ time.days }</span>
        <span className="my-2 font-sans text-2xl font-extralight">Days</span>
      </div>
      <span className="text-5xl font-bold tracking-widest">:</span>
      <div className="flex flex-col items-center">
        <span className="my-2 text-5xl font-bold tracking-widest">{ time.hours }</span>
        <span className="my-2 font-sans text-2xl font-extralight">Hours</span>
      </div>
      <span className="text-5xl font-bold tracking-widest">:</span>
      <div className="flex flex-col items-center">
        <span className="my-2 text-5xl font-bold tracking-widest">{ time.minutes }</span>
        <span className="my-2 font-sans text-2xl font-extralight">Minutes</span>
      </div>
      <span className="text-5xl font-bold tracking-widest">:</span>
      <div className="flex flex-col items-center">
        <span className="my-2 text-5xl font-bold tracking-widest">{ time.seconds }</span>
        <span className="my-2 font-sans text-2xl font-extralight">Seconds</span>
      </div>
    </div>
  );
}

export default Timer;
