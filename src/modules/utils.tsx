import {convertSecToHourString} from './converters';

export const getRestTime = (endtime: Date) : string => {
  const today = new Date();
  const dateDiff = Math.floor((endtime.getTime() - today.getTime()) / 1000);
  return convertSecToHourString(dateDiff);
};
