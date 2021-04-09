import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { FaSearch } from 'react-icons/fa';

const GoSearch: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <FaSearch onClick={() => history.push('/ko/search')}/>
  );
};

export default withRouter(GoSearch);