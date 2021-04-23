import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import EditForm from '../Modal/EditForm';
import Modal from '../Modal';
import './style/UserName.scss';

const UserName: React.FC = () => {
  const usernameState = useSelector((state: RootState) => state.UserInfoReducer);
  const { name } = usernameState;
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const toglePopup = () => {
    setIsOpenPopup(!isOpenPopup);
  };

  return (
    <>
      <Modal visible={isOpenPopup} color={'#fff'} closeCb={toglePopup} backColor={true} isWarning={false} isSide={false}>
        <EditForm setIsOpenPopup={setIsOpenPopup}/>
      </Modal>
      <button className='username-btn' onClick={toglePopup}>{name ? `${name}` : ' •᷄⌓•᷅ '}</button>
    </>
  );
};

export default UserName;