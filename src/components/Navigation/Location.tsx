import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import constantString from '../../modules/strings';

const Location: React.FC = () => {
  const LocationState = useSelector((state: RootState) => state.UserInfoReducer);
  const { city } = LocationState;

  return (
    <div className='location-section'>
      {(city !== constantString.defaultLocation) ? `${city}` : (constantString.locationError)}
    </div>
  );
};


export default Location;
