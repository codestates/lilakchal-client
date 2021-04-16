import React from 'react';
import { Dimmer, OuterContainer, InnerContainer, CloseBtn } from './style/ModalStyle';
import { AiOutlineClose } from 'react-icons/ai';

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

  const onClickDimmerHandler = () => {
    closeCb();
  };

  const preventEventPropagation = (e: React.MouseEvent<HTMLElement>) => { //any는 추후 수정하자..
    e.stopPropagation();
  };

  return (
    <>
      <Dimmer visible={visible} backColor={backColor} onClick={onClickDimmerHandler}></Dimmer>
      <OuterContainer visible={visible} onClick={onClickDimmerHandler}>
        <InnerContainer isSide={isSide} color={color} className={className} isWarning={isWarning} onClick={preventEventPropagation}>
          <CloseBtn onClick={closeCb}>
            <AiOutlineClose size="20"/>
          </CloseBtn>
          {children}
          {/* <Icon bg={isBlackBtn ? './res/close_black.png' : './res/close_white.png'} onClick={onClose}></Icon> */}
        </InnerContainer>
      </OuterContainer>
    </>
  );
};

export default Modal;