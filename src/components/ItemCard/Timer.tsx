import React, {useState, useEffect} from 'react';
import {getRestTime} from '../../modules/utils';

interface Props {
  endtime: Date,
  handleBidStatus: (isClosed: boolean) => void
}

const Timer: React.FC<Props> = ({endtime, handleBidStatus}) => {
  const [restTime, setRestTime] = useState<string>(getRestTime(endtime));

  useEffect(() => {
    const countdown = setInterval(() => {
      setRestTime(getRestTime(endtime));
    }, 1000);

    return () => clearInterval(countdown); //componenwillunmount
  }, [restTime]);

  return (
    <div className="timer">{restTime}</div>
  );
};

export default Timer;