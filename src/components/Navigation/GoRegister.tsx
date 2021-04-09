import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './style/GoRegister.scss';
// import { FaSearch } from 'react-icons/fa';
import {AiOutlinePlusCircle} from 'react-icons/ai';

type SomeComponentProps = RouteComponentProps;

const GoRegister: React.FC<SomeComponentProps> = ({ history }) => {

  const goRegister = () => history.push('/ko/register');

  return (
    <div className='register-btn'onClick={goRegister} >
      <AiOutlinePlusCircle size='40' color='black'/>
    </div>
  );
};

export default withRouter(GoRegister);
