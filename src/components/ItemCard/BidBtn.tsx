import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import { Item } from '../../redux/modules/Items';

import Modal from '../Modal';
import LoginError from '../Modal/LoginError';
import BidError from '../Modal/BidError';

interface IBidBtn {
  item: Item,
  requestBid: (price:number) => void,
  unit: number,
  isExpired: boolean
}

const BidBtn: React.FC<IBidBtn> = ({ item, requestBid, unit, isExpired }) => {

  const loginState = useSelector((state: RootState) => state.AccountReducer);
  const { isLogin } = loginState;
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isOverLimit, setIsOverLimit] = useState<boolean>(false);

  const toglePopup = () => {
    setIsOpenPopup(!isOpenPopup);
  };

  const closePopup = () => {
    setIsOverLimit(!isOverLimit);
  };

  const clickHandler = () => {

    if (isLogin && !isExpired && item.price + unit <= 2100000000) {
      requestBid(item.price + unit);
    } else if (!isLogin) {
      setIsOpenPopup(true);
    } else if (isExpired) {
      alert('이 경매는 마감되었습니다.');
    } else if (item.price + unit > 2100000000) {
      setIsOverLimit(true);
    } 
  };

  return (
    <>
      <Modal visible={isOpenPopup} color={'#fff'} closeCb={toglePopup} backColor={true} isWarning={true} isSide={false}>
        <LoginError/>
      </Modal>
      <Modal visible={isOverLimit} color={'#fff'} closeCb={closePopup} backColor={true} isWarning={true} isSide={false}>
        <BidError/>
      </Modal>
      <button className='bidButton' onClick={clickHandler}>{`+${unit.toLocaleString('ko-KR')}원`}</button>
    </>
  );
};

export default BidBtn;