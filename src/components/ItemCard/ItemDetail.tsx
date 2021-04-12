import React, { useState } from 'react';
import {Item} from '../../redux/modules/Items';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';

import Modal from '../Navigation/modal/CenterModal';
import LoginError from '../Navigation/LoginError';

interface Props {
  item: Item,
  requestBid: (price:number) => void
}

const ItemDetail: React.FC<Props> = ({item, requestBid}) => {

  const loginState = useSelector((state: RootState) => state.AccountReducer);
  const { isLogin } = loginState;
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const toglePopup = () => {
    setIsOpenPopup(!isOpenPopup);
  };

  const clickHandler = () => {

    if(isLogin) {
      requestBid(77777);
    } else {
      setIsOpenPopup(true);
    }
  };

  return (
    <>
      <Modal visible={isOpenPopup} color={'#fff'} onClose={toglePopup} backColor={false}>
        <LoginError/>
      </Modal>
      <div>ItemDefail: {item.price}</div>
      <button onClick={clickHandler}>상위입찰</button>
    </>
  );
};

export default ItemDetail;