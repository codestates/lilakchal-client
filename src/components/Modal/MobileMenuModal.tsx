import React from 'react';
import MobileMenu from './MobileMenu';
import { Dimmer, OuterContainer, InnerMenuContainer } from './style/ModalStyle';

interface Props {
  visible: boolean,
  color?: string,
  closeCb: () => void,
  className?: string,
}

const MobileMenuModal: React.FC<Props> = ({visible, closeCb}) => {

  const preventEventPropagation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <Dimmer visible={visible} backColor={false} onClick={closeCb}></Dimmer>
      <OuterContainer visible={visible} onClick={closeCb}>
        <InnerMenuContainer className='mobile-menu-container' color={'#b3e0b8'} onClick={preventEventPropagation}>
          <MobileMenu closeCb={closeCb}/>
        </InnerMenuContainer>
      </OuterContainer>
    </>
  );
};

export default MobileMenuModal;