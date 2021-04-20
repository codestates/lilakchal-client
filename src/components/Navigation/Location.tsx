import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';

const Location: React.FC = () => {
  const LocationState = useSelector((state: RootState) => state.UserInfoReducer);
  const { city } = LocationState;

  return (
    <div className='location-section'>
      {(city !== '전국') ? `${city}` : ('위치가 없어요!')}
    </div>
  );
};


export default Location;
