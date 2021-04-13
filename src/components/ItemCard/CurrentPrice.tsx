import React from 'react';
import {units} from '../../modules/units';

interface Props {
  itemId: number,
  price: number
}

const CurrentPrice: React.FC<Props> = ({itemId, price}) => {
  return (
    <div className="itemcard-price" >
      <span id={`itemcard-${itemId}`}>{price.toLocaleString('ko-KR')}</span><span>{units.price}</span>
    </div>
  );
};

export default CurrentPrice;