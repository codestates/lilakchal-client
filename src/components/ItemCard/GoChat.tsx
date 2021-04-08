import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {constantString} from '../../modules/strings';

interface Props extends RouteComponentProps {
  itemId: number
}

const GoChat: React.FC<Props> = ({ history, itemId }) => {

  const goChat = () => history.push({ //https://velog.io/@dhlee91/this.props.history.push%EB%A1%9C-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0
    pathname: '/ko/mypage/chat',
    state: {itemId: 1} //room
  });

  return (
    <button className='chat-btn' onClick={goChat}>{constantString.goChat}</button>
  );
};

export default withRouter(GoChat);
