import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import MyoptionGroup from './MyoptionGroup';
import DefaultGroup from './DefaultGroup';
import logo from '../../res/logo.png';
import './style/Header.scss';

const Header: React.FC = () => {

  const [NowPage, setNowPage] = useState<boolean>(true); //true면 defalultgroup, false면 myoptiongroup

  return (
    //로고
    // 어디 페이지인가에 따라서 <MyoptionGroup> : <DefaultGroup>
    // <LoginSection> => 로그인 상태에 따라서 <LoginBtn> : <MypageBtn>
    <div className="header-container">
      <div className="logo">
        <Link to="landing" onClick={()=> setNowPage(true)}>
          <div className='header-logo-wrapper'>
            <img className='header-logo' alt="Logo" src={logo} />
          </div>
        </Link>
      </div>
      <div className="group">
        {NowPage ? (<DefaultGroup />) : (<MyoptionGroup setNowPage={setNowPage}/>) }
      </div>
      
    </div>
  );
};

export default Header;