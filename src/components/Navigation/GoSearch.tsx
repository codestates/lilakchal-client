import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { FaSearch } from 'react-icons/fa';

interface props {
  setNowPage: any
}

const GoSearch: React.FC<RouteComponentProps & props> = ({ history, setNowPage }) => {

  const clickHandler = () => {
    history.push('/ko/search');
    setNowPage(true);
  };

  return (
    <FaSearch onClick={clickHandler}/>
  );
};

export default withRouter(GoSearch);