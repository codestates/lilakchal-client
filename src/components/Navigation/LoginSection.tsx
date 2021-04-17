import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
// import {LoginHandler, LogoutHandler} from '../../redux/modules/account';
import GoMypage from '../Navigation/GoMypage';
import Login from './Login';

const LoginSection: React.FC = () => {
  const loginState = useSelector((state: RootState) => state.AccountReducer);
  const {isLogin} = loginState;

  return (
    <div className='login-section'>
      {
        isLogin ?
          <GoMypage/> :
          <Login/>
      }
      
    </div>
  );
};

export default LoginSection;
