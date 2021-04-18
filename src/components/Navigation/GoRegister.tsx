import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import Modal from '../Modal';
import LoginError from '../Modal/LoginError';

import './style/GoRegister.scss';
// import { FaSearch } from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa';

type SomeComponentProps = RouteComponentProps;

const GoRegister: React.FC<SomeComponentProps> = ({ history }) => {

  const loginState = useSelector((state: RootState) => state.AccountReducer);
  const { isLogin } = loginState;
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const toglePopup = () => {
    setIsOpenPopup(!isOpenPopup);
  };

  const goRegister = () => {
    if(isLogin) {
      history.push('/ko/register');
    } else {
      setIsOpenPopup(true);
    }
  };

  return (
    <>
      <Modal visible={isOpenPopup} color={'#fff'} closeCb={toglePopup} backColor={true} isWarning={true} isSide={false}>
        <LoginError/>
      </Modal>
      <div onClick={goRegister} >
        <FaPlus className='register-btn'/>
      </div>
    </>
  );
};

export default withRouter(GoRegister);
