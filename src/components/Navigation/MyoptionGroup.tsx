import React from 'react';
import Logout from './Logout';
import UserName from './UserName';

interface props {
  setNowPage: any
}

const MyoptionGroup:React.FC<props> = ({ setNowPage }) => {
  return (
    // FilterBtn , username, GoSearch, Logout
    <div className='MyoptionGroup-container'>
      <UserName />
      <GoSearch setNowPage={setNowPage}/>
      <Logout/>
    </div>
  );
};

export default MyoptionGroup;
