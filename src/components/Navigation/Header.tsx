import React from 'react';
import { Link } from 'react-router-dom';
import MyoptionGroup from './MyoptionGroup';
import DefaultGroup from './DefaultGroup';
import logo from '../../res/logo.png';
import './style/Header.scss';
import { RootState } from '../../redux/modules/reducer';
import { HeaderHandler } from '../../redux/modules/HeaderState';
import { useDispatch, useSelector } from 'react-redux';



const Header: React.FC = () => { 

  // const [NowPage, setNowPage] = useState<boolean>(true); //true면 defalultgroup, false면 myoptiongroup
  // console.log('true면 defaultGroup보여주기', NowPage);

  const HeaderState = useSelector((state: RootState) => state.HeaderReducer);
  const { Default } = HeaderState;
  const dispatch = useDispatch();

  window.onpopstate = function(event: any) {
    // setNowPage(true);
    // console.log('마이페이지에서 뒤로갔을 때 setnowpage', NowPage);
  };

  return (
    //로고
    // 어디 페이지인가에 따라서 <MyoptionGroup> : <DefaultGroup>
    // <LoginSection> => 로그인 상태에 따라서 <LoginBtn> : <MypageBtn>
    <div className="header-container">
      <div className='header'>
        <div className="logo">
          <Link to="/" onClick={()=> dispatch(HeaderHandler(true))}>
            <div className='header-logo-wrapper'>
              <img className='header-logo' alt="Logo" src={logo} />
            </div>
          </Link>
        </div>
        <div className="group">
          {Default ? (<DefaultGroup/>) : (<MyoptionGroup/>) }
        </div>

      </div>
    </div>
  );
};

export default Header;
