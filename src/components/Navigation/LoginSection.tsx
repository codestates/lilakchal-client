import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import {LoginHandler, LogoutHandler} from '../../redux/modules/account';

const LoginSection: React.FC = () => {
  const loginState = useSelector((state: RootState) => state.AccountReducer);
  const {isLogin} = loginState;
  const dispatch = useDispatch();
  
  const clickLogin = () => {
    if(isLogin) {
      dispatch(LogoutHandler(false));
    } else {
      dispatch(LoginHandler(true));
    }
  };

  return (
    <div className='loginsection'>
      <button onClick={clickLogin}>
        {
          isLogin ?
            '마이페이지' :
            '로그인'
        }
      </button>
    </div>
  );
};

export default LoginSection;
