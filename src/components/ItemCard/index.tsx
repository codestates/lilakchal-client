import React from 'react';
import CurrentPrice from './CurrentPrice';
import {Item} from '../../redux/modules/Items';
import {Container, Thumbnail, Contents, Location} from './style/ItemCardStyle';

interface Props {
  item: Item
}

const ItemCard: React.FC<Props> = ({item}) => {
  return (
    <Container className={'itemcard-container'}>
      <Thumbnail bg={item.photo}></Thumbnail>
      <Contents>
        <Location>{item.city}</Location>
        {
        /* Timer */
        }
        <CurrentPrice itemId={1} price={item.price}></CurrentPrice>
      </Contents>
    </Container>
  );
};

export default ItemCard;