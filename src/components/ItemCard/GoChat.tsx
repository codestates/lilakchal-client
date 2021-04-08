import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {constantString} from '../../modules/strings';

interface Props extends RouteComponentProps{
  itemId: number
}

const GoChat: React.FC<Props> = ({ history, itemId }) => {

  const goChat = () => history.push('/ko/mypage/chat', {
    itemId //room
  });

  return (
    <button className='chat-btn' onClick={goChat}>{constantString.goChat}</button>
  );
};

export default withRouter(GoChat);
