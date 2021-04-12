import React, {useState} from 'react';
import './style/MessageInput.scss';

interface Props {
  handleSubmit: (e:React.MouseEvent) => void,
}

const MessageInput: React.FC<Props> = ({handleSubmit}) => {
  const [message, setMessage] = useState<string>('');
  
  return (
    <div className="message-input-form">
      <input className="message-input" type="text" onChange={e=>setMessage(e.target.value)}></input>
      <button className="message-submit-btn" onClick={handleSubmit} disabled={message === '' ? true : false}>입력</button>
    </div>
  );
};

export default MessageInput;