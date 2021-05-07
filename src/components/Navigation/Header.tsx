import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import MenuGroups from './MenuGroups';
import {device} from '../../style/variable';
import logo from '../../res/logo.png';
import mobileLogo from '../../res/mobileLogo.png';
import './style/Header.scss';



const Header: React.FC = () => { 

  const isMobile = useMediaQuery({
    query: `${device.mobile}`
  });

  return (
    <div className="header-container">
      <div className='header'>
        <div className="logo">
          <Link to="/">
            <div className='header-logo-wrapper'>
              <img className='header-logo' alt="Logo" src={isMobile ? mobileLogo : logo} />
            </div>
          </Link>
        </div>
        <MenuGroups/>
      </div>
    </div>
  );
};

export default Header;
