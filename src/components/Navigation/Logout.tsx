import React from 'react';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { LogoutHandler } from '../../redux/modules/account';
// import qs from 'qs';



const Logout: React.FC = () => {
  //1. 카카오 서버에 로그아웃 요청을 보낸다
  //2. isLogin을 false로 만들고 랜딩페이지로 보낸다(isLogin이 false가 되면 자동으로 defaultGroup이 보임)

  const dispatch = useDispatch();

  const Logout = () => {
    const clientId = '4d6b5048295d43015b06e9ffdf6419dd';
    const redirectUri = 'http://localhost:3000';
    
    window.location.assign(`https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${redirectUri}`);
    dispatch(LogoutHandler(false));
    
  };
  return (
    <div>
      <button onClick={Logout}>로그아웃</button>
    </div>
  );
};

export default Logout;
