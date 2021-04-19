import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSelector, RootStateOrAny, useDispatch  } from 'react-redux';
import {requestMyAuction} from '../../modules/request';
import {ItemHandler, UnformatedItem} from '../../redux/modules/Items';
import {LogoutHandler} from '../../redux/modules/account';
import {UserInfoHandler} from '../../redux/modules/UserInfo';
import {TypeHandler} from '../../redux/modules/SearchType';
import {getFormatedItems} from '../../modules/converters';
import { FiLogOut } from 'react-icons/fi';
import './style/MobileMenu.scss';
import {ReactComponent as BidIcon} from '../../res/svgs/BidIcon.svg';
import {ReactComponent as RegisterIcon} from '../../res/svgs/EditIcon.svg';
import {ReactComponent as MoneyIcon} from '../../res/svgs/MoneyIcon.svg';

interface Props extends RouteComponentProps{
  closeCb: () => void,
}

const { Kakao } = window;

const MobileMenu: React.FC<Props> = ({history, closeCb}) => {
  const userState = useSelector((state:RootStateOrAny) => state.UserInfoReducer);
  const {name, id, city} = userState;
  const dispatch = useDispatch();

  const goResigtorPage = () => {
    history.push('/ko/register');
    closeCb();
  };

  const requestCallback = (items:Array<UnformatedItem>) => {
    dispatchItems(items);
    goMyAuctionPage();
  };

  const dispatchItems = (items:Array<UnformatedItem>) => {
    dispatch(ItemHandler(getFormatedItems(items)));
  };

  const goMyAuctionPage = () => {
    history.push('/ko/mypage/auction');
    closeCb();
  };

  const handleMyAuctionBtn = (type: string) => {
    requestMyAuction(type, {userId: id, city: city, offset: 0}, requestCallback);
    dispatch(TypeHandler(type));
  };

  const logout = () => {
    if (Kakao.Auth.getAccessToken()) {
      Kakao.Auth.logout(() => {
        dispatch(LogoutHandler(false));
        dispatch(UserInfoHandler({id: 0, name: ''})); //서버로부터 응답받으면 리덕스에 정보 저장
        window.location.href = '/';
      });
    }
  };

  return (
    <>
      <span className='mobile-name'>{name}</span>
      <div className='mobile-menu-container'>
        <div className='mobile-menu' onClick={goResigtorPage}>
          <RegisterIcon className='mobile-icon' fill="black"/>
          <span>경매등록</span>
        </div>
        <div className='mobile-menu' onClick={() => {handleMyAuctionBtn('seller');}}>
          <MoneyIcon className='mobile-icon' fill="black"/>
          <span>판매상품</span>
        </div>
        <div className='mobile-menu' onClick={() => {handleMyAuctionBtn('buyer');}}>
          <BidIcon className='mobile-icon' fill="black"/>
          <span>입찰상품</span>
        </div>
      </div>
      <FiLogOut className='mobile-logout' size='36' onClick={logout}/>
    </>
  );
};

export default withRouter(MobileMenu);