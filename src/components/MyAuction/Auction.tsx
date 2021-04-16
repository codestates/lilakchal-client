import React, { useState } from 'react';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';

import { Container } from '../../pages/style/SearchPageStyle';
import { bidData } from '../../interface/Bid';
import { auctionSocket } from '../../modules/socket';
import { Item, ItemHandler } from '../../redux/modules/Items';
import ItemCard from '../ItemCard';
import Empty from '../../modules/Empty';
import { getFormatedItems } from '../../modules/converters';
import './style/Auction.scss';

dotenv.config();

export interface TitleInfo{
  title: string
}

const Action: React.FC<RouteComponentProps> = ({history}) => {

  const userState = useSelector((state: RootStateOrAny) => state.UserInfoReducer);
  const { id } = userState;
  const itemState = useSelector((state: RootStateOrAny) => state.ItemReducer);
  const { items } = itemState;
  const typeState = useSelector((state: RootStateOrAny) => state.SearchTypeReducer);
  const { searchType } = typeState;
  const dispatch = useDispatch();
  const [Count, setCount] = useState(5);
  const [title, setTitle] = useState<string>('판매');

  console.log(items);

  //페이지 뒤로가기, 앞으로 가기 할때 items바뀌도록 하기
  useEffect(() => {
    
    
    console.log('앞으로 다시오면 mypage useeffect가 실행되나요?'); 
    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {
    setCount(5);
  }, [searchType]);
  
  useEffect(() => {
    if (history.location.state) {
      const { title } = history.location.state as TitleInfo;
      console.log('useeffect실행될때 title=', title);
      setTitle(title);
    }
    else {
      console.log('처음 title=', title);
      setTitle('판매');
    }
      
    //3. socketio에 연결: 가격정보 수신 시 querySelector로 해당 부분의 가격을 변경한다.
    auctionSocket.on('bid', ({itemId, price, userId}: bidData) => {
      console.log('receive bid', price, userId, itemId);
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
    console.log('SearchType Buyer?', searchType);
    window.onscroll = () => {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setCount(Count + 5);
        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/buyer`, 
          { offset: Count, userId: id },
          { withCredentials: true })
          .then(res => {
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
    console.log('SearchType Seller?', searchType);
    window.onscroll = () => {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setCount(Count + 5);
        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/myauction/seller`, 
          { offset: Count, userId: id },
          { withCredentials: true })
          .then(res => {
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
        <div>{title}</div>
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

export default withRouter(Action);
