import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSelector, RootStateOrAny, useDispatch  } from 'react-redux';
import {requestMyAuction} from '../../modules/request';
import {ItemHandler, UnformatedItem} from '../../redux/modules/Items';
import {TypeHandler} from '../../redux/modules/SearchType';
import {getFormatedItems} from '../../modules/converters';
import { FiLogOut } from 'react-icons/fi';
import './style/MobileMenu.scss';
import bidIcon from '../../res/svgs/BidIcon.svg';
import registerIcon from '../../res/svgs/EditIcon.svg';
import moneyIcon from '../../res/svgs/MoneyIcon.svg';

interface Props extends RouteComponentProps{
  closeCb: () => void,
}

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

  return (
    <>
      <span className='mobile-name'>{name}</span>
      <div className='mobile-menu-container'>
        <div className='mobile-menu' onClick={goResigtorPage}>
          <img className='mobile-icon' src={registerIcon} />
          <span>경매등록</span>
        </div>
        <div className='mobile-menu' onClick={() => {handleMyAuctionBtn('seller');}}>
          <img className='mobile-icon' src={moneyIcon} />
          <span>판매상품</span>
        </div>
        <div className='mobile-menu' onClick={() => {handleMyAuctionBtn('buyer');}}>
          <img className='mobile-icon' src={bidIcon} />
          <span>입찰상품</span>
        </div>
      </div>
      <FiLogOut className='mobile-logout' size='36'/>
    </>
  );
};

export default withRouter(MobileMenu);