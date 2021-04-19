import React, { useState } from 'react'; //, { useState }
import { RouteComponentProps, withRouter } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import {BsPeopleCircle} from 'react-icons/bs';
import './style/GoMypage.scss';
import {device} from '../../style/variable';
import MobileMenuModal from '../Modal/MobileMenuModal';


const GoMypage: React.FC<RouteComponentProps> = ({history}) => {

  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const goMypage = () => {
    //1. html에 있는 검색 값 지우기
    const SearchValue = (document.getElementById('searchbar') as HTMLInputElement);
    SearchValue.value = '';
    history.push('/ko/mypage/auction');
  };

  const isMobile = useMediaQuery({
    query: `${device.mobile}`
  });

  const toglePopup = ():void => {
    setIsVisibleMenu(!isVisibleMenu);
  };

  return (
    <>
      <div className='mypage-btn'>
        <BsPeopleCircle className='gomypage'onClick={isMobile ? toglePopup : goMypage} />
      </div>
      {isMobile ?
        <MobileMenuModal visible={isVisibleMenu} closeCb={toglePopup}></MobileMenuModal> : <></>}
    </>
  );
};

export default withRouter(GoMypage);
