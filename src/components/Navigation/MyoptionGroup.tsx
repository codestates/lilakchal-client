import React from 'react';
import Logout from './Logout';
import UserName from './UserName';
import GoSearch from './GoSearch';
import FilterBtn from './FilterBtn';
import './style/MyoptionGroup.scss';

const MyoptionGroup:React.FC = () => {
  return (
    <div className='MyoptionGroup-container'>
      <div className='FilterBtn-container'>
        <FilterBtn/>
      </div>
      <div className='GoSearch-container'>
        <GoSearch />
      </div>
      <div className='username-container'>
        <UserName />
      </div>
      <div className='Logout-container'>
        <Logout/>
      </div>
      
    </div>
  );
};

export default MyoptionGroup;
