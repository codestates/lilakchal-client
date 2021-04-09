import React from 'react';
import {Item} from '../../redux/modules/Items';

interface Props {
  item: Item,
  requestBid: (price:number) => void
}

const ItemDetail: React.FC<Props> = ({item, requestBid}) => {

  return (
    <div>
      ItemDefail: {item.price}
      <button onClick={() => {requestBid(77777);}}>상위입찰</button>
    </div>
  );
};

export default ItemDetail;