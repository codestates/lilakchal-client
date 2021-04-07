import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';


type SomeComponentProps = RouteComponentProps;

const Start: React.FC<SomeComponentProps> = ({ history }) => {

  const goMain = () => history.push('/main/search');
  
  return (
    <div className='start-button'>
      <button onClick={goMain}>
        시작하기
      </button>
    </div>
  );
};

export default withRouter (Start);
