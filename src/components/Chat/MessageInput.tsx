import React, {useState, useRef} from 'react';
import './style/MessageInput.scss';

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
      <input className="message-input" type="text" onChange={e=>setMessage(e.target.value)}></input>
      <button className="message-submit-btn" type="submit" onClick={handleSubmit} disabled={message === '' ? true : false}>입력</button>
    </form>
  );
};

export default MessageInput;