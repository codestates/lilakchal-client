import React from 'react';
import Logout from './Logout';
import UserName from './UserName';
import GoSearch from './GoSearch';
import './style/MyoptionGroup.scss';

const MyoptionGroup:React.FC = () => {
  return (
    // FilterBtn , username, GoSearch, Logout
    <div className='MyoptionGroup-container'>
      <UserName />
      <GoSearch />
      <Logout/>
    </div>
  );
};

export default MyoptionGroup;
