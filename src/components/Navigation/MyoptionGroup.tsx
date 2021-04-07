import React from 'react';
interface props {
  setNowPage: any
}

const MyoptionGroup:React.FC<props> = ({setNowPage}) => {
  return (
    //auctionFilter , 위치btn, 로그아웃btn
    <div>
      <button onClick={()=>setNowPage(true)}>Myoptiongroup보여지는중</button>
    </div>
  );
};

export default MyoptionGroup;
