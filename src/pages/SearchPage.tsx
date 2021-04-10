import React, {useEffect} from 'react';
import { useDispatch, useSelector, RootStateOrAny  } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';

import { UserInfoHandler, LocationInfoHandler } from '../redux/modules/UserInfo';
import { LoginHandler } from '../redux/modules/account';
//import {initialState} from '../redux/modules/Items';
import ItemCard from '../components/ItemCard/index';
import {Container} from './style/SearchPageStyle';
import {Item} from '../redux/modules/Items';
import {kakaoKey} from '../modules/constants';
import {auctionSocket, bidData} from '../modules/socket';

dotenv.config();

const SearchPage:React.FC = () => {

  const itemState = useSelector((state:RootStateOrAny) => state.ItemReducer);
  const {items} = itemState;
  const dispatch = useDispatch();

  const oauthLoginHandler = (authorizationCode: string) => {
    axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/oauth`,
      { authorizationCode },
      {withCredentials: true})
      .then(res => {
        console.log('res.data = ', res.data);
        dispatch(UserInfoHandler({id: res.data.id, name: res.data.name})); //서버로부터 응답받으면 리덕스에 정보 저장
        dispatch(LoginHandler(true)); // 정보 저장하고 isLogin true로 (마이페이지 보이도록)
      });
  };
  
  useEffect(() => {
    //search 페이지 들어오면 할일
    //1. oauth? 테스트 코드인가?
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      console.log(authorizationCode);
      oauthLoginHandler(authorizationCode);
    }

    //2. 사용자에게 위치 정보 이용 동의 요청을 보낸다
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
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
    

    //3. socketio에 연결: 가격정보 수신 시 querySelector로 해당 부분의 가격을 변경한다.
    auctionSocket.on('bid', ({itemId, price}: bidData) => {
      console.log('receive bid', price);
      const priceDiv = document.querySelector(`#itemcard-${itemId}`) as Node;
      priceDiv.textContent = price.toString();
    });
  }, []);

  return (
    <Container>
      { console.log(items) }
      {
        items ? (items.map((item: Item) => 
          <ItemCard item={item} key={item.id}></ItemCard>
        )) : <></>
      }
    </Container>
  );
};

export default SearchPage;
