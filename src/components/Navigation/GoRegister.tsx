import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

type SomeComponentProps = RouteComponentProps;

const GoRegister: React.FC<SomeComponentProps> = ({ history }) => {

  const goRegister = () => history.push('/ko/register');

  return (
    <div>
      <button className='register-btn' onClick={goRegister}>판매페이지</button>
    </div>
  );
};

export default withRouter(GoRegister);
