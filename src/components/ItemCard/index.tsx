import React, {useState} from 'react'; //{useState}
import CurrentPrice from './CurrentPrice';
import GoChat from './GoChat';
import Timer from './Timer';
import {Item} from '../../redux/modules/Items';
import {Container, Thumbnail, Contents, Location, Title} from './style/ItemCardStyle';

interface Props {
  item: Item
}

const ItemCard: React.FC<Props> = ({item}) => {

  const [isExpired, setIsExpired] = useState<boolean>(false);
  const handleBidStatus = (isExpired: boolean) : void => {
    setIsExpired(isExpired);
  };

  return (
    <Container className={'itemcard-container'}>
      <Thumbnail bg={item.photo}></Thumbnail>
      <Contents>
        <Location>{item.city}</Location>
        <Title>{item.title}</Title>
        <Timer endtime={item.endTime} handleBidStatus={handleBidStatus}/>
        <CurrentPrice itemId={item.id} price={item.price}></CurrentPrice>
        {
          isExpired ?
            <GoChat itemId={item.id}></GoChat> :
            <></>
        }
      </Contents>
    </Container>
  );
};

export default ItemCard;