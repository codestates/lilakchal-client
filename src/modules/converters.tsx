export const convertSecToHourString = (targetSec: number): string => {
  const hour = Math.ceil(targetSec / 3600);
  const min = Math.ceil(targetSec % 3600 / 60);
  const sec = Math.ceil(targetSec % 3600 % 60);
  
  return `${hour}:${min}:${sec}`;
};