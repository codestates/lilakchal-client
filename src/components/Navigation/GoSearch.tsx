import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ImSearch } from 'react-icons/im';
import './style/GoSearch.scss';

const GoSearch: React.FC<RouteComponentProps> = ({ history}) => {
  const handleClick = () => {
    history.push('/ko/search');
  };

  return (
    <ImSearch className='gosearch-btn'  onClick={handleClick}/>
  );
};

export default withRouter(GoSearch);