import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector, RootStateOrAny  } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '../redux/modules/reducer';
import ItemCard from '../components/ItemCard/index';
import {Container} from './style/SearchPageStyle';
import { Item, ItemHandler } from '../redux/modules/Items';
// import {kakaoKey} from '../modules/constants';
import {auctionSocket} from '../modules/socket';
import {bidData} from '../interface/Bid';
import { getFormatedItems } from '../modules/converters';

import LoadingModal from '../components/Modal/LoadingModal';
import Empty from '../components/Common/Empty';

dotenv.config();

interface MatchParams {
  keyword: string;
}

const SearchPage:React.FC<RouteComponentProps<MatchParams>> = ({ history, match}) => {
  const userInfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { city } = userInfoState;
  const itemState = useSelector((state:RootStateOrAny) => state.ItemReducer);
  const {items} = itemState;
  const dispatch = useDispatch();
  const [Count, setCount] = useState(5);
  

  // history.pushState(null, '', ''); 
  window.onpopstate = function(event: any) {

    console.log('나는 inpopstate다');
    
    if(match.params.keyword) {
      axios.get('https://localhost:4000/search',
        { params: { city: city, keyword: match.params.keyword, offset: 0 }})
        .then(res => {
          console.log('SearchPage에서 items Effect', res.data.items);
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items))); 
          setCount(5);
        });
    }
    //2-(2) 검색 키워드가 없을때(처음 입장) 모든 자료 요청
    if(!match.params.keyword) {
      axios.get('https://localhost:4000/search',
        { params: { city: city, offset: 0}})
        .then(res => {
          console.log(res.data.items);
          console.log(getFormatedItems(res.data.items));
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items))); //검색결과 받아서 리덕스에 저장
          setCount(5);
        });
    }
  };
  
  useEffect(() => {    
    // 2-(1) 검색키워드가 있을 때 서버에 요청

    // const SearchValue = (document.getElementById('searchbar') as HTMLInputElement);

    // if(SearchValue.value === null) {
    //   SearchValue.value = '';
    // }
    // SearchValue.value = '';


    console.log('match.params.keyword=', match.params.keyword);

    // if(city !== '') {
    if(match.params.keyword) {
      axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/search`,
        { params: { city: city, keyword: match.params.keyword, offset: 0 }})
        .then(res => {
          console.log('SearchPage에서 items Effect', res.data.items);
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items)));
          setCount(5);
        });
    }
    //2-(2) 검색 키워드가 없을때(처음 입장) 모든 자료 요청
    if(!match.params.keyword ) {
      axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/search`,
        { params: { city: city, offset: 0}})
        .then(res => {
          console.log(res.data.items);
          console.log(getFormatedItems(res.data.items));
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items))); //검색결과 받아서 리덕스에 저장
          setCount(5);
        });
    }
    // }
          
    
  }, [city, match.params.keyword]);

  useEffect(() => {
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
  
  console.log('SearchPage에서 city', items);

  // 인피니티 스크롤

  useEffect(() => {
    return () => {
      window.onscroll = null;
      window.onpopstate = null;
    };
  }, []);

  window.onscroll = function() {
    //window height + window scrollY 값이 document height보다 클 경우,
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      //실행할 로직 (콘텐츠 추가)
      // count += 5;
      setCount(Count + 5);
      axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/search`,
        { params: { city: city, offset: Count, keyword: match.params.keyword }})
        .then(res => {
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          if (!res.data.items) {
            //dispatch(ItemHandler(getFormatedItems(items)));
            console.log('없음..');
          } else {
            const newItems = getFormatedItems(res.data.items); 
            dispatch(ItemHandler({ items: [...items, ...newItems.items]})); //검색결과 받아서 리덕스에 저장    
          }
        });

    }
  };
  
  const emptyTitle = '검색 결과가 없어요 :(';
  const emptyText = '다른 검색어를 입력해보세요!';

  return (
    <Container>
      {!city ?  <LoadingModal isLoading={true}/> 
        :
        items.length ? (items.map((item: Item) => 
          <ItemCard item={item} key={item.id}></ItemCard>
        )) : < Empty emptyTitle={emptyTitle} emptyText={emptyText}/>
      }
    </Container>
  );
};



export default withRouter(SearchPage);
