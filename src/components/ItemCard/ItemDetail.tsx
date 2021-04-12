import React from 'react';
import {Item} from '../../redux/modules/Items';

import Timer from './Timer';
import BidBtn from './BidBtn';
import './style/itemDetail.scss';

interface Props {
  item: Item,
  requestBid: (price:number) => void,
  endtime: Date,
  handleBidStatus: (isClosed: boolean) => void,
  isExpired: boolean
}

const ItemDetail: React.FC<Props> = ({item, requestBid, endtime, handleBidStatus, isExpired}) => {
  
  const unit1000 = 1000;
  const unit10000 = 10000;
  const unit100000 = 100000;

  return (
    <>
      <section className="itemdetail">
        <article className="itemdetail-topbox">
          <h1 className="itemdetail-title">{item.title}</h1>
          <img className="itemdetail-img" src={item.photo} alt=""/>
        </article>
        <article className="itemdetail-midbox">
          <div className="itemdetail-price">현재가격: {item.price}원</div>
          <div className="itemdetail-timer">남은시간: <Timer endtime={endtime} handleBidStatus={handleBidStatus} /></div>
        </article>
        <div className="itemdetail-description">{item.description}</div>
        <article className="itemdetail-btnbox">
          <BidBtn item={item} requestBid={requestBid} unit={unit1000} isExpired={isExpired}/>
          <BidBtn item={item} requestBid={requestBid} unit={unit10000} isExpired={isExpired}/>
          <BidBtn item={item} requestBid={requestBid} unit={unit100000} isExpired={isExpired}/>
        </article>
      </section>
    </>
  );
};

export default ItemDetail;