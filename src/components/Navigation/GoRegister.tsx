import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';

import './style/GoRegister.scss';
// import { FaSearch } from 'react-icons/fa';
import {AiOutlinePlusCircle} from 'react-icons/ai';

type SomeComponentProps = RouteComponentProps;

const GoRegister: React.FC<SomeComponentProps> = ({ history }) => {

  const loginState = useSelector((state: RootState) => state.AccountReducer);
  const { isLogin } = loginState;

  const goRegister = () => {

    if(isLogin) {
      history.push('/ko/register');
    } else {
      alert('로그인 후 이용 가능합니다.');
    }

  };

  return (
    <div className='register-btn'onClick={goRegister} >
      <AiOutlinePlusCircle size='40' color='black'/>
    </div>
  );
};

export default withRouter(GoRegister);
