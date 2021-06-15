import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { LocationInfoHandler } from '../redux/modules/UserInfo';
import { kakaoKey } from '../modules/constants';
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
  const [count, setCount] = useState(6);

  const geoLocation = () => {
    if(window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({coords}) => {
        const address = await axios.get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${coords.longitude}&y=${coords.latitude}`,
          {
            headers: {
              Authorization: `KakaoAK ${kakaoKey.REST_API}`,
            },
          }
        );
        const {region_1depth_name, region_2depth_name} = address.data.documents[0].address;
        dispatch(LocationInfoHandler(`${region_1depth_name} ${region_2depth_name}`));
        // localStorage.setItem('city', `${region_1depth_name} ${region_2depth_name}`);
      }, 
      () => {
        dispatch(LocationInfoHandler('전국'));
      });
    } else {
      dispatch(LocationInfoHandler('전국'));
    }
  };

  const requestCallback = (items:Array<UnformatedItem>) => {
    dispatch(ItemHandler(getFormatedItems(items)));
    isChanged = true;
    setCount(6);
  };

  const requestCallbackByScroll = (additionalItems:Array<UnformatedItem>) => {
    oneTime = false; // 아이템 받아온 후 다시 요청가능하게 바꿈
    if (additionalItems) {
      const newItems = getFormatedItems(additionalItems); 
      dispatch(ItemHandler({ items: [...items, ...newItems.items]})); //검색결과 받아서 리덕스에 저장  
    }
  };

  useEffect(() => {    
    requestSearchItems({ params: { city: city, keyword: match.params.keyword, offset: 0 }}, requestCallback);
  }, [city, match.params.keyword]);

  useEffect(() => {
    window.onscroll = function() {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.8 && !oneTime) {
        oneTime = true; // 중복요청하지 않게 조건변경
        setCount(count + 6);
        requestSearchItems({ params: { city: city, offset: count, keyword: match.params.keyword }}, requestCallbackByScroll);
      }
    };

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
    window.onpopstate = () => {
      requestSearchItems({ params: { city: city, keyword: match.params.keyword, offset: 0 }}, requestCallback);
    };
    return () => {
      window.onscroll = null;
      window.onpopstate = null;
      window.scrollTo(0, 0);
      isChanged = false; // 화면전환 로딩조건
    };
  }, []);

  return (
    <div className="searchpage-container">
      { city && isChanged ? 
        items.length ? (items.map((item: Item) => 
          <ItemCard item={item} key={item.id}></ItemCard>
        )) : < Empty emptyTitle={ConstantString.noResult} emptyText={ConstantString.noResultDetail}/>
        :
        <LoadingModal isLoading={true} callback={geoLocation}/> 
      }
    </div>
  );
};

export default withRouter(SearchPage);
