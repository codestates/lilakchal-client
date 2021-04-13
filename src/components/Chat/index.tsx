import React, {useEffect, useState}from 'react';
import { useSelector, RootStateOrAny  } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import './style/Chat.scss';
import Message from './Message';
import MessageInput from './MessageInput';
import { chatSocket } from '../../modules/socket';
import {itemInfo, message, unFormatedMessage} from '../../interface/Chat';
import {getFormatedMessages, getFormatedMessage} from '../../modules/converters';


const Chat:React.FC<RouteComponentProps> = ({history}) => {

  const userState = useSelector((state:RootStateOrAny) => state.UserInfoReducer);
  const {id} = userState;
  const [itemInfo, setItemInfo] = useState<itemInfo>({itemId: 0, title: 'title'}); //채팅방 정보
  const [chats, setChats] = useState<Array<message>>([]);

  
  

  useEffect(() => {
    //1. 어떤 물품의 채팅인지 정보를 받는다.
    const { itemId, title } = history.location.state as itemInfo;
    setItemInfo({itemId, title});

    //2. socketio로 접속하여 
    chatSocket.emit('join', {
      userId: id,
      itemId: itemId
    });

    return () => {
      chatSocket.off('messages');
      chatSocket.off('message');
    };
  }, []);

  useEffect(() => { //소켓이벤트 [chats]에 안붙이면 이전 메시지(chats) state가 빈배열이 된다.
    //2. 이전까지의 메시지내용을 불러온후 렌더링한다.
    chatSocket.on('messages', (data:Array<unFormatedMessage>) => {
      setChats(getFormatedMessages(data));
    });

    //3. socketio에서 하나의 메시지를 받으면 setChats를 통해 재렌더링한다.
    chatSocket.on('message', (data:unFormatedMessage) => {
      setChats([...chats, getFormatedMessage(data)]);
    });
  }, [chats]);

  const inputMessage = (message: string): void => {
    const newChat = {
      userId: id,
      itemId: itemInfo.itemId,
      text: message,
      createdAt: new Date()
    };
    setChats([...chats, newChat]);
    chatSocket.emit('message', newChat);
  };

  return (
    <div className="chat-container">
      <div className="chat-title">{itemInfo.title}</div>
      <div className="chat-message-box" id="chat-message-box">
        {
          chats.map((chat:message) => 
            <Message key={`${chat.createdAt.getTime()}-${chat.userId}`} isMine={id === chat.userId} text={chat.text} time={chat.createdAt}/>)
        } 
      </div>
      <div className="chat-write-box">
        <MessageInput submitMessage={inputMessage}>입력하기</MessageInput>
      </div>
    </div>
  );
};

export default withRouter(Chat);
