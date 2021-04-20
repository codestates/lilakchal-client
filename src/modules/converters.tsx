import ConstantString from './strings';
import { ItemsState, UnformatedItem } from '../redux/modules/Items';
import {message, unFormatedMessage} from '../interface/Chat';

export const convertSecToHourString = (targetSec: number): string => {
  const hour = Math.floor(targetSec / 3600);
  const min = Math.floor(targetSec % 3600 / 60);
  const sec = Math.floor(targetSec % 3600 % 60); 
  
  if(hour <= 0 && min <= 0 && sec <= 0) {
    return ConstantString.endBid;
  } else {
    return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
};

export const getFormatedChatDate = (time: Date):string => {
  const hour = time.getHours();
  const min = time.getMinutes();
  const ampm = hour <= 12 ? '오전' : '오후';

  return `${ampm} ${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
};

export const getFormatedItems = (items: Array<UnformatedItem>): ItemsState => {
  if(!items) {
    return {items: []};
  }

  return {items: items.map(item => {
    const {id, title, price, photo, description, winnerId, sellerId, isClosed, city} = item;
    return {id, title, price, photo: `https://localhost:4000/${photo}`, endTime: new Date(item.endTime), description, winnerId, sellerId, isClosed, city};
  })};
};

export const getFormatedMessages = (messages: Array<unFormatedMessage>): Array<message> => {
  return messages.map((message) => {
    return getFormatedMessage(message);
  });
};

export const getFormatedMessage = (message: unFormatedMessage): message => {
  const {userId, itemId, text, createdAt} = message;
  return {userId, itemId, text, createdAt: new Date(createdAt)};
};
