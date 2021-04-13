import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {constantString} from '../../modules/strings';
import { useDispatch } from 'react-redux';
import { HeaderHandler } from '../../redux/modules/HeaderState';

interface Props extends RouteComponentProps{
  itemId: number,
  title: string
}

const GoChat: React.FC<Props> = ({ history, itemId, title }) => {
  
  const dispatch = useDispatch();
  
  const goChat = () => {
    history.push('/ko/mypage/chat', {
      itemId, //room
      title
    });
    dispatch(HeaderHandler(true));
  };

  return (
    <button className='chat-btn' onClick={goChat}>{constantString.goChat}</button>
  );
};

export default withRouter(GoChat);
