import {constantString} from './strings';

export const convertSecToHourString = (targetSec: number): string => {
  const hour = Math.floor(targetSec / 3600);
  const min = Math.floor(targetSec % 3600 / 60);
  const sec = Math.floor(targetSec % 3600 % 60);
  
  if(hour <= 0 && min <= 0 && sec <= 0) {
    return constantString.endBid;
  } else {
    return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
};