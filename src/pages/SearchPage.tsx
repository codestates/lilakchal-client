import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector, RootStateOrAny  } from 'react-redux';
import dotenv from 'dotenv';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '../redux/modules/reducer';
import ItemCard from '../components/ItemCard/index';
import {requestSearchItems} from '../modules/request';
import { Item, ItemHandler, UnformatedItem } from '../redux/modules/Items';
import {auctionSocket} from '../modules/socket';
import {bidData} from '../interface/Bid';
import { getFormatedItems } from '../modules/converters';
import ConstantString from '../modules/strings';

import LoadingModal from '../components/Modal/LoadingModal';
import Empty from '../components/Common/Empty';

import './style/SearchPage.scss';

let oneTime = false; // 무한스크롤시 중복요청 방지
let isChanged = false; // 페이지 이동시 이전 저장된 아이템이 안보이게

dotenv.config();

interface MatchParams {
  keyword: string;
}

const SearchPage:React.FC<RouteComponentProps<MatchParams>> = ({match}) => {
  const userInfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { city } = userInfoState;
  const itemState = useSelector((state:RootStateOrAny) => state.ItemReducer);
  const {items} = itemState;
  const dispatch = useDispatch();
  const [Count, setCount] = useState(6);

  const requestCallback = (items:Array<UnformatedItem>) => {
    dispatch(ItemHandler(getFormatedItems(items)));
    isChanged = true;
    setCount(6);
  };

  const requestCallbackByScroll = (addtionalItems:Array<UnformatedItem>) => {
    oneTime = false; // 아이템 받아온 후 다시 요청가능하게 바꿈
    if (addtionalItems) {
      const newItems = getFormatedItems(addtionalItems); 
      dispatch(ItemHandler({ items: [...items, ...newItems.items]})); //검색결과 받아서 리덕스에 저장  
    }
  };

  window.onpopstate = () => {
    requestSearchItems({ params: { city: city, keyword: match.params.keyword, offset: 0 }}, requestCallback);
  };

  useEffect(() => {    
    requestSearchItems({ params: { city: city, keyword: match.params.keyword, offset: 0 }}, requestCallback);
  }, [city, match.params.keyword]);

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

  useEffect(() => {
    return () => {
      window.onscroll = null;
      window.onpopstate = null;
      window.scrollTo(0, 0);
      isChanged = false; // 화면전환 로딩조건
    };
  }, []);

  window.onscroll = function() {
    //window height + window scrollY 값이 document height보다 클 경우,
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.8 && !oneTime) {
      oneTime = true; // 중복요청하지 않게 조건변경
      setCount(Count + 6);
      requestSearchItems({ params: { city: city, offset: Count, keyword: match.params.keyword }}, requestCallbackByScroll);
    }
  };
  
  return (
    <div className="searchpage-container">
      { city && isChanged ? 
        items.length ? (items.map((item: Item) => 
          <ItemCard item={item} key={item.id}></ItemCard>
        )) : < Empty emptyTitle={ConstantString.noResult} emptyText={ConstantString.noResultDetail}/>
        :
        <LoadingModal isLoading={true}/> 
      }
    </div>
  );
};

 

export default withRouter(SearchPage);
