import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { FaSearch } from 'react-icons/fa';

const GoSearch: React.FC<RouteComponentProps> = ({ history}) => {


  const clickHandler = () => {
    history.push('/ko/search');
  };

  return (
    <FaSearch size='40' onClick={clickHandler}/>
  );
};

export default withRouter(GoSearch);