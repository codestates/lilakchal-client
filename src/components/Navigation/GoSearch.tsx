import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { HeaderHandler } from '../../redux/modules/HeaderState';



const GoSearch: React.FC<RouteComponentProps> = ({ history}) => {

  const dispatch = useDispatch();

  const clickHandler = () => {
    history.push('/ko/search');
    dispatch(HeaderHandler(true));

  };

  return (
    <FaSearch size='40' onClick={clickHandler}/>
  );
};

export default withRouter(GoSearch);