import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Container } from '../../pages/style/SearchPageStyle';
import { Item } from '../../redux/modules/Items';
import ItemCard from '../ItemCard';
import './style/Auction.scss';



const Action: React.FC = () => {

  const itemState = useSelector((state:RootStateOrAny) => state.ItemReducer);
  const {items} = itemState;



  return (
    <div className='itemCard'>
      <Container>
        {
          items ? (items.map((item: Item) => 
            <ItemCard item={item} key={item.id}></ItemCard>
          )) : <></>
        }
      </Container>
    </div>
  );
};

export default Action;
