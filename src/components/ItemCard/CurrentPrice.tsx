import React from 'react';
import {units} from '../../modules/units';
import './style/ItemCard.scss';

interface Props {
  price: number,
  className: string
}

const CurrentPrice: React.FC<Props> = ({ price, className}) => {
  return (
    <div className={className} >
      <span>{price.toLocaleString('ko-KR')}</span><span>{units.price}</span>
    </div>
  );
};

export default CurrentPrice;