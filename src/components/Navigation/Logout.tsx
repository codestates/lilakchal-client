import React from 'react';

import dotenv from 'dotenv';
import { useDispatch } from 'react-redux';
import { LogoutHandler } from '../../redux/modules/account';
import { UserInfoHandler } from '../../redux/modules/UserInfo';
import { FiLogOut } from 'react-icons/fi';
import './style/Logout.scss';

const { Kakao } = window;
dotenv.config();

const Logout: React.FC = () => {

  const dispatch = useDispatch();

  const Logout = () => {
    if (Kakao.Auth.getAccessToken()) {
      Kakao.Auth.logout(() => {
        dispatch(LogoutHandler(false));
        dispatch(UserInfoHandler({id: 0, name: ''})); //서버로부터 응답받으면 리덕스에 정보 저장
        window.location.href = '/';
      });
    }
  };

  return (
    <div>
      <FiLogOut className='Logout' size='40' color='#4EBDC9' onClick={Logout}/>
    </div>
  );
};

export default Logout;
