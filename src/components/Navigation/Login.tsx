import React from 'react';
import dotenv from 'dotenv';
import { RouteComponentProps, withRouter } from 'react-router';

import './style/Login.scss';
import axios from 'axios';
import { UserInfoHandler } from '../../redux/modules/UserInfo';
import { LoginHandler } from '../../redux/modules/account';
import { useDispatch } from 'react-redux';

const { Kakao } = window;
dotenv.config();

declare global {
  interface Window {
    Kakao?: any ;
  }
}

const Login: React.FC<RouteComponentProps> = ({history}) => {


  const dispatch = useDispatch();
  
  const kakaoLogin = () => {
    Kakao.Auth.login({
      success: (auth: { access_token: string; }) => {
        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/oauth`,
          { access_token: auth.access_token},
          {withCredentials: true})
          .then(res => {
            dispatch(UserInfoHandler({id: res.data.id, name: res.data.name}));
            dispatch(LoginHandler(true));
            history.push('/ko/search');
          });
        // dispatch(UserInfoHandler({id: 3, name: '김유상'}));
        // dispatch(LoginHandler(true));
        // history.push('/ko/search');
        console.log(auth.access_token);
      },
      fail: (err : string) => {
        console.error(err);
      }
    });    
  };

  return (
    <div className='login-container'>
      <button className='login-button'onClick={kakaoLogin}></button>
    </div>
  );
};

export default withRouter(Login);
