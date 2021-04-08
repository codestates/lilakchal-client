import React from 'react';
import CurrentPrice from './CurrentPrice';
import GoChat from './GoChat';
import {Item} from '../../redux/modules/Items';
import {Container, Thumbnail, Contents, Location, Title} from './style/ItemCardStyle';

interface Props {
  item: Item
}

const ItemCard: React.FC<Props> = ({item}) => {
  return (
    <Container className={'itemcard-container'}>
      <Thumbnail bg={item.photo}></Thumbnail>
      <Contents>
        <Location>{item.city}</Location>
        <Title>{item.title}</Title>
        {
        /* Timer */
        }
        <CurrentPrice itemId={item.id} price={item.price}></CurrentPrice>
        <GoChat itemId={item.id}></GoChat>
      </Contents>
    </Container>
  );
};

export default ItemCard;