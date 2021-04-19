import React, {useState} from 'react'; //{useState}
import CurrentPrice from './CurrentPrice';
import GoChat from './GoChat';
import Timer from './Timer';
import {Item} from '../../redux/modules/Items';
import { useSelector, RootStateOrAny  } from 'react-redux';
import {auctionSocket} from '../../modules/socket';
import ItemDetail from './ItemDetail';
import Modal from '../Modal/index';
import './style/ItemCard.scss';

interface Props {
  item: Item
}

const ItemCard: React.FC<Props> = ({item}) => {
  const userState = useSelector((state:RootStateOrAny) => state.UserInfoReducer);
  const {id} = userState;
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  
  const handleBidStatus = (isExpired: boolean) : void => {
    setIsExpired(isExpired);
  };

  const requestBid = (price: number) => {
    auctionSocket.emit('bid', {
      userId: id,
      itemId: item.id,
      price: price
    });
  };

  const openPopUp = () => {
    setIsOpenPopup(true);

  };

  const closePopUp = () => {
    setIsOpenPopup(false);
  };

  const classname = 'timer';

  return (
    <>
      <Modal visible={isOpenPopup} color={'#CCEBF5'}  closeCb={closePopUp} backColor={true} isWarning={false} isSide={true} className={'sidemodal'}>
        <ItemDetail item={item} requestBid={requestBid} endtime={item.endTime} handleBidStatus={handleBidStatus} isExpired={isExpired}></ItemDetail>
      </Modal>
      <div className="itemcard-container" onClick={() => openPopUp()}>
        <div className="itemcard-location">{item.city}</div>
        <div className="itemcard-content">
          <div className="itemcard-imgbox">
            <img className="itemcard-img" src={item.photo} alt=""/>
          </div>
          <div className="itemcard-text">
            <Timer classname={classname} endtime={item.endTime} handleBidStatus={handleBidStatus}/>
            <div className="itemcard-title">{item.title}</div>
            <CurrentPrice price={item.price} className="itemcard-price"></CurrentPrice>
            {
              (isExpired && (id === item.sellerId || id === item.winnerId)) ?
                <GoChat itemId={item.id} title={item.title}></GoChat> :
                <></>
            }
          </div> 
        </div>
      </div>
    </>
  );
};

export default ItemCard;