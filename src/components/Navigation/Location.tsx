import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';

const Location: React.FC = () => {

  //1. 리덕스에 저장된 유저위치 가져오기
  //2. 가져와서 유저위치 표시하기

  const LocationState = useSelector((state: RootState) => state.UserInfoReducer);
  const { city } = LocationState;
  // const UserCity = localStorage.getItem('city');

  return (
    <div className='location-section'>
      {(city !== '전국') ? `${city}` : ('위치가 없어요!')}
    </div>
  );
};


export default Location;
