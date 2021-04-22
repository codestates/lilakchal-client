import io from 'socket.io-client';
import dotenv from 'dotenv';

dotenv.config();

//socket은 객체로 만들어서 singleton 구현
export const auctionSocket = io(`${process.env.REACT_APP_SERVER_ADDRESS}/auction`, { transports: ['websocket'] });
export const chatSocket = io(`${process.env.REACT_APP_SERVER_ADDRESS}/chat`, { transports: ['websocket'] });
