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
import { ReactComponent as MoneyIcon } from '../../res/svgs/MoneyIcon.svg';
import constantString from '../../modules/strings';

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
        dispatch(UserInfoHandler({id: 0, name: ''})); 
        window.location.href = '/';
      });
    }
  };

  return (
    <>
      <div className='mobile-name'>{name}</div>
      <div className='mobile-menu-container'>
        <div className='mobile-menu' onClick={goResigtorPage}>
          <RegisterIcon className='mobile-icon' fill="#212321"/>
          <span>{constantString.mobileRegisterMenu}</span>
        </div>
        <div className='mobile-menu' onClick={() => {handleMyAuctionBtn('seller');}}>
          <MoneyIcon className='mobile-icon' fill="#212321"/>
          <span>{constantString.mobileSellerMenu}</span>
        </div>
        <div className='mobile-menu' onClick={() => {handleMyAuctionBtn('buyer');}}>
          <BidIcon className='mobile-icon' fill="#212321"/>
          <span>{constantString.mobileBuyerMenu}</span>
        </div>
      </div>
      <FiLogOut className='mobile-logout' size='36' color="#212321" onClick={logout}/>
    </>
  );
};

export default withRouter(MobileMenu);