import React from 'react';
import Logout from './Logout';
import UserName from './UserName';
import GoSearch from './GoSearch';
import FilterBtn from './FilterBtn';
import './style/MyoptionGroup.scss';

const MyoptionGroup:React.FC = () => {
  return (
    // FilterBtn , username, GoSearch, Logout
    <div className='MyoptionGroup-container'>
      <UserName />
      <GoSearch />
      <Logout/>
      <FilterBtn/>
    </div>
  );
};

export default MyoptionGroup;
