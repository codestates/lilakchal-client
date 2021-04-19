import React, { useState } from 'react';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import axios from 'axios';
import dotenv from 'dotenv';

import { Container } from '../../pages/style/SearchPageStyle';
import { bidData } from '../../interface/Bid';
import { auctionSocket } from '../../modules/socket';
import { Item, ItemHandler } from '../../redux/modules/Items';
import ItemCard from '../ItemCard';
import Empty from '../Common/Empty';
import { getFormatedItems } from '../../modules/converters';
import './style/Auction.scss';

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

  //페이지 뒤로가기, 앞으로 가기 할때 items바뀌도록 하기
  useEffect(() => {
    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {
    setCount(6);
  }, [searchType]);
  
  useEffect(() => {
      
    //3. socketio에 연결: 가격정보 수신 시 querySelector로 해당 부분의 가격을 변경한다.
    auctionSocket.on('bid', ({itemId, price, userId}: bidData) => {
      //const priceDiv = document.querySelector(`#itemcard-${itemId}`) as Node;
      //priceDiv.textContent = price.toString();
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

  if (searchType === 'buyer') {
    window.onscroll = () => {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.8 && !oneTime) {
        oneTime = true; // 중복요청하지 않게 조건변경
        setCount(Count + 6);
        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/buyer`, 
          { offset: Count, userId: id, city: city },
          { withCredentials: true })
          .then(res => {
            oneTime = false; // 아이템 받아온 후 다시 요청가능하게 바꿈
            if(!res.data.items) {
              return;
            } else {
              const newItems = getFormatedItems(res.data.items); 
              dispatch(ItemHandler({ items: [...items, ...newItems.items]}));
            }
          });
      }
    };
  } else {
    window.onscroll = () => {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.8 && !oneTime) {
        oneTime = true; // 중복요청하지 않게 조건변경
        setCount(Count + 6);
        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/seller`, 
          { offset: Count, userId: id, city: city },
          { withCredentials: true })
          .then(res => {
            oneTime = false; // 아이템 받아온 후 다시 요청가능하게 바꿈
            if (!res.data.items) {
              return;
            } else {
              const newItems = getFormatedItems(res.data.items); 
              dispatch(ItemHandler({ items: [...items, ...newItems.items]}));
            }
          });
      }
    };
  }
  
  const emptyTitle = '입찰/판매중인 물품이 없어요.';
  const emptyText = '물건을 등록하거나 입찰해보세요!';

  return (
    <div className='itemCard'>
      <div className='auction-title'>
        {searchType === 'buyer' ? (<div>입찰중인상품</div>) : (<div>판매중인상품</div>)} 
      </div>
      <Container>
        {
          items.length ? (items.map((item: Item) => 
            <ItemCard item={item} key={item.id}></ItemCard>
          )) : <Empty emptyTitle={emptyTitle} emptyText={emptyText}/>
        }
      </Container>
    </div>
  );
};

export default Action;
