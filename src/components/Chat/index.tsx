import React, {useEffect, useState}from 'react';
import { useSelector, RootStateOrAny  } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import './style/Chat.scss';
import Message from './Message';

interface itemInfo{
  itemId: number,
  title: string
}

interface messageForm{
  userId: number,
  itemId: number,
  text: string,
  createAt: Date
}

const testData: Array<messageForm> = [
  {
    userId: 3,
    itemId: 1,
    text: '안녕하세요 거래할까요',
    createAt: new Date('2021-04-10 15:33:44')
  },
  {
    userId: 2,
    itemId: 1,
    text: 'ㅇㅇ',
    createAt: new Date('2021-04-10 15:33:45')
  }
];

const Chat:React.FC<RouteComponentProps> = ({history}) => {

  const userState = useSelector((state:RootStateOrAny) => state.UserInfoReducer);
  const {id} = userState;
  const [itemInfo, setItemInfo] = useState<itemInfo>({itemId: 0, title: 'title'}); //채팅방 정보
  const [chats, setChats] = useState<Array<messageForm>>(testData);
  

  useEffect(() => {
    //1. 어떤 물품의 채팅인지 정보를 받는다.
    const { itemId, title } = history.location.state as itemInfo;
    setItemInfo({itemId, title});

    //2. socketio로 접속하여 이전까지의 메시지내용을 불러온후 렌더링한다.
    //renderMessage()

    //3. socketio에서 메시지를 받으면 setChats를 통해 재렌더링한다.

  }, []);

  const inputMessage = (): void => {
    const newChat = {
      userId: 3,
      itemId: 1,
      text: '언제가 좋으세요',
      createAt: new Date('2021-04-10 15:33:46')
    };
    setChats([...chats, newChat]);
  };

  return (
    <div className="chat-container">
      <div className="chat-title">{itemInfo.title}</div>
      <div className="chat-message-box" id="chat-message-box">
        {
          chats.map((chat:messageForm) => 
            <Message key={`${chat.createAt.getTime()}-${chat.userId}`} isMine={id === chat.userId} text={chat.text} time={chat.createAt}/>)
        } 
      </div>
      <div className="chat-write-box">
        <button onClick={inputMessage}>입력하기</button>
      </div>
    </div>
  );
};

export default withRouter(Chat);
