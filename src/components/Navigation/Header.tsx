import React from 'react';
import { Link } from 'react-router-dom';
import MenuGroups from './MenuGroups';
import logo from '../../res/logo.png';
import './style/Header.scss';



const Header: React.FC = () => { 

  return (
    <div className="header-container">
      <div className='header'>
        <div className="logo">
          <Link to="/">
            <div className='header-logo-wrapper'>
              <img className='header-logo' alt="Logo" src={logo} />
            </div>
          </Link>
        </div>
        <MenuGroups/>
      </div>
    </div>
  );
};

export default Header;
