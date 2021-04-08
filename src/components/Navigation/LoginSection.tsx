import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
// import {LoginHandler, LogoutHandler} from '../../redux/modules/account';
import GoMypage from '../Navigation/GoMypage';
import Login from './Login';

interface props {
  setNowPage: any,
}

const LoginSection: React.FC<props> = ({setNowPage}) => {
  const loginState = useSelector((state: RootState) => state.AccountReducer);
  const {isLogin} = loginState;
  // const dispatch = useDispatch();
  
  // const clickLogin = () => {
  //   if(isLogin) {
  //     dispatch(LogoutHandler(false));
  //   } else {
  //     dispatch(LoginHandler(true));
  //   }
  // };

  return (
    <div className='loginsection'>
      {
        isLogin ?
          <GoMypage setNowPage={setNowPage}/> :
          <Login/>
      }
      
    </div>
  );
};

export default LoginSection;
