import React from 'react';
import { Dimmer, OuterContainer, InnerContainer } from './CenterModalStyle';
import { AiOutlineClose } from 'react-icons/ai';

interface ICenterModal {
  visible: boolean,
  backColor: boolean,
  color: string,
  onClose(): boolean | void,
}

const CenterModal: React.FC<ICenterModal> = ({ visible, onClose, children, backColor, color }): JSX.Element => {
  return (
    <>
      <Dimmer visible={visible} backColor={backColor}></Dimmer>
      <OuterContainer visible={visible}>
        <InnerContainer color={color}>
          {children}
          <AiOutlineClose onClick={onClose}>Close</AiOutlineClose>
        </InnerContainer>
      </OuterContainer>
    </>
  );
};

export default CenterModal;