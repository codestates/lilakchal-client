import React from 'react';
import { useDispatch } from 'react-redux';
import { LogoutHandler } from '../../redux/modules/account';
import { UserInfoHandler } from '../../redux/modules/UserInfo';
import { FaDoorOpen } from 'react-icons/fa';
import './style/Logout.scss';




const Logout: React.FC = () => {
  //1. 카카오 서버에 로그아웃 요청을 보낸다
  //2. isLogin을 false로 만들고 랜딩페이지로 보낸다(isLogin이 false가 되면 자동으로 defaultGroup이 보임)

  const dispatch = useDispatch();

  const Logout = () => {
    const clientId = '4d6b5048295d43015b06e9ffdf6419dd';
    const redirectUri = 'http://localhost:3000';
    
    window.location.assign(`https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${redirectUri}`);
    dispatch(LogoutHandler(false));
    dispatch(UserInfoHandler({id: 0, kakaoId: '', name: ''})); //서버로부터 응답받으면 리덕스에 정보 저장
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
