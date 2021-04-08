import React from 'react'; //{useState}
import CurrentPrice from './CurrentPrice';
import GoChat from './GoChat';
import {Item} from '../../redux/modules/Items';
import {Container, Thumbnail, Contents, Location, Title} from './style/ItemCardStyle';

interface Props {
  item: Item
}

const ItemCard: React.FC<Props> = ({item}) => {

  //Timer 넣고 주석 풀기(지금 풀면 eslint로 걸림)
  // const [isExpired, setIsExpired] = useState<boolean>(false);

  // const handleBidStatus = (isExpired: boolean) : void => {
  //   setIsExpired(isExpired);
  // };

  return (
    <Container className={'itemcard-container'}>
      <Thumbnail bg={item.photo}></Thumbnail>
      <Contents>
        <Location>{item.city}</Location>
        <Title>{item.title}</Title>
        {
        /* isExpired?  Timer:<></> */
        }
        <CurrentPrice itemId={item.id} price={item.price}></CurrentPrice>
        <GoChat itemId={item.id}></GoChat>
      </Contents>
    </Container>
  );
};

export default ItemCard;