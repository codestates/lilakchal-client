import React from 'react';
import './style/Location.scss';


const Location: React.FC = () => {

  //리덕스에 저장된 유저정보를 받아와서 여기에 표시함
  return (
    <div className='location-section'>
      <div className='location'>리덕스에서 받아온 지역이름</div>
    </div>
  );
};

export default Location;
