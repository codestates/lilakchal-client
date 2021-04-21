import React, {useState, useEffect} from 'react';
import {getRestTime} from '../../modules/utils';
import ConstantString from '../../modules/strings';
import './style/Timer.scss';

interface Props {
  endtime: Date,
  handleBidStatus: (isClosed: boolean) => void,
  classname: string
}

const Timer: React.FC<Props> = ({endtime, handleBidStatus, classname}) => {
  const [restTime, setRestTime] = useState<string>(getRestTime(endtime));
  const isCloseDeadLine = (): boolean => {
    const hour = restTime.split(':')[0];
    return !isNaN(Number(hour)) && Number(hour) < 24;
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      const result = getRestTime(endtime);
      setRestTime(result);
      if(result === ConstantString.endBid) {
        handleBidStatus(true);
        clearInterval(countdown); 
      }
    }, 1000);

    return () => clearInterval(countdown); //componenwillunmount
  }, [restTime]);

  return (
    <div className={classname + (isCloseDeadLine() ? ' deadline' : '')}>{restTime}</div>
  );
};

export default Timer;