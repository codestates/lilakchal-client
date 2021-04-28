import React, { useState } from 'react';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import dotenv from 'dotenv';

import { bidData } from '../../interface/Bid';
import { auctionSocket } from '../../modules/socket';
import {requestMyAuction} from '../../modules/request';
import { Item, ItemHandler, UnformatedItem } from '../../redux/modules/Items';
import ItemCard from '../ItemCard';
import Empty from '../Common/Empty';
import { getFormatedItems } from '../../modules/converters';
import ConstantString from '../../modules/strings';
import './style/Auction.scss';
import '../../pages/style/MainPage.scss';

let oneTime = false; // 무한스크롤시 중복요청 방지

dotenv.config();

const Action: React.FC = () => {

  const userState = useSelector((state: RootStateOrAny) => state.UserInfoReducer);
  const { id } = userState;
  const itemState = useSelector((state: RootStateOrAny) => state.ItemReducer);
  const { items } = itemState;
  const typeState = useSelector((state: RootStateOrAny) => state.SearchTypeReducer);
  const { searchType } = typeState;
  const dispatch = useDispatch();
  const [Count, setCount] = useState(6);
  const userInfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { city } = userInfoState;

  useEffect(() => {
    return () => {
      window.onscroll = null;
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    setCount(6);
    window.scrollTo(0, 0);
  }, [searchType]);
  

  const dispatchItemsByScroll = (additionalItems:Array<UnformatedItem>) => {
    const newItems = getFormatedItems(additionalItems);
    dispatch(ItemHandler({ items: [...items, ...newItems.items]}));
  };

  const requestCallback = (additionalItems:Array<UnformatedItem>) => {
    oneTime = false; // 아이템 받아온 후 다시 요청가능하게 바꿈
    if(additionalItems) {
      dispatchItemsByScroll(additionalItems);
    }        
  };


  useEffect(() => {
    auctionSocket.on('bid', ({itemId, price, userId}: bidData) => {
      const newItems = items.map((item: Item) => {
        if(item.id === itemId) {
          item.winnerId = userId;
          item.price = price;
        }
        return item;
      });
      dispatch(ItemHandler({items: newItems}));
    });
    return () => {
      auctionSocket.off('bid');
    };
  }, [items]);

  window.onscroll = () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.8 && !oneTime) {
      oneTime = true; // 중복요청하지 않게 
      setCount(Count + 6);
      requestMyAuction(searchType, { offset: Count, userId: id, city: city }, requestCallback);
    }
  };

  return (
    <>
      <div className='auction-title'>
        {searchType === 'buyer' ? (ConstantString.buyerTitle) : (ConstantString.sellerTitle)} 
      </div>
      <div className='auction-container'>
        {
          items.length ? (items.map((item: Item) => 
            <ItemCard item={item} key={item.id}></ItemCard>
          )) : <Empty emptyTitle={ConstantString.noFilteredResult} emptyText={ConstantString.noFilteredResultDetail}/>
        }
      </div>
    </>
  );
};

export default Action;
