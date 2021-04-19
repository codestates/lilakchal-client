import React from 'react';
import { useMediaQuery } from 'react-responsive';
import SearchBar from './SearchBar';
import GoRegister from './GoRegister';
import LoginSection from './LoginSection';
import Location from './Location';
import {device} from '../../style/variable';
import './style/DefaultGroup.scss';

const DefaultGroup:React.FC = () => {

  const isMobile = useMediaQuery({
    query: `${device.mobile}`
  });

  return (
    <div className="defalut-container">
      <div className='search-container'>
        <div className='searchbar-container'>
          <SearchBar/>
        </div>
        <div className='location-container'>
          <Location/>
        </div>
      </div>
      <div className='default-icons'>
        {isMobile ? 
          <></> :
          <div className='GoRegister-container'>
            <GoRegister/>
          </div>
        }
        <div className='loginsection-container'>
          <LoginSection/>
        </div>
      </div>
    </div>
  );
};

export default DefaultGroup;
