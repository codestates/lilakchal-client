import React, {useState, useRef} from 'react';
import './style/MessageInput.scss';
import {IoSend} from 'react-icons/io5';

interface Props {
  submitMessage: (message: string) => void,
}

const MessageInput: React.FC<Props> = ({submitMessage}) => {
  const [message, setMessage] = useState<string>('');
  const messageInputTag = useRef<HTMLFormElement>(null);
  
  const handleSubmit = (e:React.MouseEvent):void => {
    e.preventDefault();
    submitMessage(message);
    setMessage('');
    messageInputTag?.current?.reset();
  };

  return (
    <form ref={messageInputTag} className="message-input-form" >
      <input className="message-input" type="text" placeholder="메세지를 입력해주세요." onChange={e=>setMessage(e.target.value)}></input>
      <button className="message-submit-btn" type="submit"  onClick={handleSubmit} disabled={message === '' ? true : false}>
        <IoSend className="message-submit-icon" ></IoSend>
      </button>
    </form>
  );
};

export default MessageInput;