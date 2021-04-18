import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { FaSearch } from 'react-icons/fa';
import './style/GoSearch.scss';

const GoSearch: React.FC<RouteComponentProps> = ({ history}) => {


  const clickHandler = () => {
    history.push('/ko/search');
  };

  return (
    <FaSearch className='gosearch-btn'  onClick={clickHandler}/>
  );
};

export default withRouter(GoSearch);