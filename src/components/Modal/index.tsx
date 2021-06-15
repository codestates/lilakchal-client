import React from 'react';
import { Dimmer, OuterContainer, InnerContainer, CloseBtn } from './style/ModalStyle';
import { IoClose } from 'react-icons/io5';
import './style/ModalContent.scss';

interface Props {
  visible: boolean,
  color: string,
  closeCb: () => void,
  className?: string,
  children: React.ReactNode,
  backColor: boolean,
  isWarning: boolean,
  isSide: boolean,
}


const Modal: React.FC<Props> = ({ visible, isSide, color, closeCb, className, children, backColor, isWarning }) => {

  const HandleClickDimmer = () => {
    closeCb();
  };

  const preventEventPropagation = (e: React.MouseEvent<HTMLElement>) => { //any는 추후 수정하자..
    e.stopPropagation();
  };

  return (
    <>
      <Dimmer visible={visible} backColor={backColor} onClick={HandleClickDimmer}></Dimmer>
      <OuterContainer visible={visible} onClick={HandleClickDimmer}>
        <InnerContainer isSide={isSide} color={color} className={className} isWarning={isWarning} onClick={preventEventPropagation}>
          <CloseBtn onClick={closeCb}>
            <IoClose color="#707070" size={isSide ? '40' : '20'}/>
          </CloseBtn>
          {children}
        </InnerContainer>
      </OuterContainer>
    </>
  );
};

export default Modal;