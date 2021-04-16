import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {constantString} from '../../modules/strings';
import './style/GoChat.scss';

interface Props extends RouteComponentProps{
  itemId: number,
  title: string
}

const GoChat: React.FC<Props> = ({ history, itemId, title }) => {

  const goChat = () => history.push('/ko/mypage/chat', {
    itemId, //room
    title
  });

  return (
    <button className='chat-btn' onClick={goChat}>{constantString.goChat}</button>
  );
};

export default withRouter(GoChat);
