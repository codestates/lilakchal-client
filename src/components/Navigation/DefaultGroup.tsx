import React from 'react';
import { useMediaQuery } from 'react-responsive';
import GoRegister from './GoRegister';
import LoginSection from './LoginSection';
import SearchContainer from './SearchContainer';
//import SearchBar from './SearchBar';
//import Location from './Location';
import {device} from '../../style/variable';
import './style/DefaultGroup.scss';

const DefaultGroup:React.FC = () => {

  const isMobile = useMediaQuery({
    query: `${device.mobile}`
  });

  return (
    <div className="defalut-container">
      <SearchContainer/>
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
