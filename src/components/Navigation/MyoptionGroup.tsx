import React from 'react';
import UserName from './UserName';
import GoSearch from './GoSearch';

interface props {
  setNowPage: any
}

const MyoptionGroup:React.FC<props> = () => {
  return (
    //auctionFilter , 위치btn, 로그아웃btn
    <div>
      <UserName />
      <GoSearch />
    </div>
  );
};

export default MyoptionGroup;
