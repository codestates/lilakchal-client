import React from 'react';

import dotenv from 'dotenv';
import { useDispatch } from 'react-redux';
import { LogoutHandler } from '../../redux/modules/account';
import { UserInfoHandler } from '../../redux/modules/UserInfo';
import { FaDoorOpen } from 'react-icons/fa';
import './style/Logout.scss';

dotenv.config();

const Logout: React.FC = () => {
  //1. 카카오 서버에 로그아웃 요청을 보낸다
  //2. isLogin을 false로 만들고 랜딩페이지로 보낸다(isLogin이 false가 되면 자동으로 defaultGroup이 보임)

  const dispatch = useDispatch();

  const Logout = () => {
    const clientId = `${process.env.REACT_APP_KAKAO_CLIENT_ID}`;
    const redirectUri = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
    
    window.location.assign(`https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${redirectUri}`);
    dispatch(LogoutHandler(false));
    dispatch(UserInfoHandler({id: 0, name: ''})); //서버로부터 응답받으면 리덕스에 정보 저장
    localStorage.setItem('isLogin', 'false');
    localStorage.setItem('city', '');
    
  };
  return (
    <div>
      <FaDoorOpen className='Logout' size='40' onClick={Logout}/>
    </div>
  );
};

export default Logout;
