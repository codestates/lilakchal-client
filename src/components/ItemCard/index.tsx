import React, {useState} from 'react'; //{useState}
import CurrentPrice from './CurrentPrice';
import GoChat from './GoChat';
import Timer from './Timer';
import {Item} from '../../redux/modules/Items';
import { useSelector, RootStateOrAny  } from 'react-redux';
import {Container, Thumbnail, Contents, Location, Title} from './style/ItemCardStyle';
import {auctionSocket} from '../../modules/socket';
import ItemDetail from './ItemDetail';
import Modal from '../Modal/index';

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

  //{userId, itemId, price}
  const requestBid = (price: number) => {
    console.log('bidsend', price);
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

  return (
    <Container className={'itemcard-container'}>
      <Modal visible={isOpenPopup} color={'#7660dccc'}  closeCb={closePopUp} backColor={true} isWarning={false} isSide={true}>
        <ItemDetail item={item} requestBid={requestBid} ></ItemDetail>
      </Modal>
      <Thumbnail bg={item.photo}></Thumbnail>
      <Contents>
        <Location>{item.city}</Location>
        <Timer endtime={item.endTime} handleBidStatus={handleBidStatus}/>
        <Title onClick={() => openPopUp()}>{item.title}</Title>
        <CurrentPrice itemId={item.id} price={item.price}></CurrentPrice>
        {
          (isExpired && (id === item.sellerId || id === item.winnerId)) ?
            <GoChat itemId={item.id} title={item.title}></GoChat> :
            <></>
        }
      </Contents>
    </Container>
  );
};

export default ItemCard;