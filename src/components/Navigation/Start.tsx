import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './style/StartBtn.scss';


type SomeComponentProps = RouteComponentProps;

const Start: React.FC<SomeComponentProps> = ({ history }) => {

  const goMain = () => history.push('/ko/search');
  
  return (
    <div className='start-button'>
      <button className='startBtn' onClick={goMain}>
        START
      </button>
    </div>
  );
};

export default withRouter (Start);
