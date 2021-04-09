import React from 'react';
import Logout from './Logout';

interface props {
  setNowPage: any
}

const MyoptionGroup:React.FC<props> = ({setNowPage}) => {
  return (
    // FilterBtn , username, GoSearch, Logout
    <div className='MyoptionGroup-container'>
      <button onClick={()=>setNowPage(true)}>GoSearch</button> 
      <Logout/>
    </div>
  );
};

export default MyoptionGroup;
