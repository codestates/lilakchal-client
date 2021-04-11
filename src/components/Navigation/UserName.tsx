import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import EditForm from './EditForm';
import Modal from './modal/CenterModal';

const UserName: React.FC = () => {
  const usernameState = useSelector((state: RootState) => state.UserInfoReducer);
  const { name } = usernameState;
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const openPopUp = () => {
    setIsOpenPopup(true);
  };

  const closePopUp = () => {
    setIsOpenPopup(false);
  };

  return (
    <>
      <Modal visible={isOpenPopup} color={'#fff'} onClose={closePopUp} backColor={true}>
        <EditForm />
      </Modal>
      <button onClick={openPopUp}>{name ? `${name}` : '이름없음'}</button>
    </>
  );
};

export default UserName;