import React from 'react';
import {Container, Text, Time as TimeStamp} from './style/MessageStyle';
import {getFormatedChatDate} from '../../modules/converters';

interface Props {
  text: string,
  isMine: boolean,
  time: Date
}

const Message: React.FC<Props> = ({text, isMine, time}) => {
  return (
    <Container isMine={isMine}>
      <Text isMine={isMine}>{text}</Text>
      <TimeStamp>{getFormatedChatDate(time)}</TimeStamp>
    </Container>
  );
};

export default Message;