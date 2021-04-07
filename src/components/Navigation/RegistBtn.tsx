import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

type SomeComponentProps = RouteComponentProps;

const RegistBtn:React.FC<SomeComponentProps> = ({ history }) => {
  const goRegister = () => history.push('/ko/register');
  return (
    <div className='registbtn'>
      <button onClick={goRegister}>물품등록</button>
    </div>
  );
};

export default withRouter (RegistBtn);
