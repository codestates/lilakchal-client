import React, {useEffect} from 'react';
import { useDispatch, useSelector, RootStateOrAny  } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';
import { RouteComponentProps, withRouter } from 'react-router';

import { UserInfoHandler, LocationInfoHandler } from '../redux/modules/UserInfo';
import { LoginHandler} from '../redux/modules/account';
import { RootState } from '../redux/modules/reducer';
import ItemCard from '../components/ItemCard/index';
import {Container} from './style/SearchPageStyle';
import { Item, ItemHandler } from '../redux/modules/Items';
import {kakaoKey} from '../modules/constants';
import {auctionSocket, bidData} from '../modules/socket';
import { getFormatedItems } from '../modules/converters';

let count = 0; // 인피니티 스크롤 offset 설정
//import LoadingModal from '../components/Modal/LoadingModal';

dotenv.config();

interface MatchParams {
  keyword: string;
}

const SearchPage:React.FC<RouteComponentProps<MatchParams>> = ({ history, match}) => {
  const userInfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id, city } = userInfoState;
  const itemState = useSelector((state:RootStateOrAny) => state.ItemReducer);
  const {items} = itemState;
  const dispatch = useDispatch();
  
  //ouath관련 함수
  const oauthLoginHandler = async (authorizationCode: string) => {
    await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/oauth`,
      { authorizationCode },
      {withCredentials: true})
      .then(res => {
        console.log('res.data = ', res.data);
        dispatch(UserInfoHandler({id: res.data.id, name: res.data.name}));
        dispatch(LoginHandler(true));
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('id', res.data.id);
        history.push('/ko/search');
      });
  };

  // history.pushState(null, '', ''); 
  window.onpopstate = function(event: any) { 
    if(match.params.keyword) {
      axios.get('https://localhost:4000/search',
        { params: { city: city, keyword: match.params.keyword, offset: 1 }})
        .then(res => {
          console.log('SearchPage에서 items Effect', res.data.items);
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items))); 
        });
    }
    //2-(2) 검색 키워드가 없을때(처음 입장) 모든 자료 요청
    if(!match.params.keyword) {
      axios.get('https://localhost:4000/search',
        { params: { city: city, offset: 1}})
        .then(res => {
          console.log(res.data.items);
          console.log(getFormatedItems(res.data.items));
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items))); //검색결과 받아서 리덕스에 저장
        });
    }
    console.log('뒤로가기 체크');

  };
  
  
  useEffect(() => {
    //search 페이지 들어오면 할일

    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    const login = localStorage.getItem('isLogin');
    

    if(login === 'true') {
      dispatch(LoginHandler(true));
    }

    if (authorizationCode && id === 0) {
      console.log(authorizationCode);
      oauthLoginHandler(authorizationCode);
      dispatch(LoginHandler(true));
    }

    //1. 사용자에게 위치 정보 이용 동의 요청을 보낸다

    
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
          
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
    
    
    // 2-(1) 검색키워드가 있을 때 서버에 요청

    // const SearchValue = (document.getElementById('searchbar') as HTMLInputElement);

    // if(SearchValue.value === null) {
    //   SearchValue.value = '';
    // }
    // SearchValue.value = '';


    console.log('match.params.keyword=', match.params.keyword);

    // if(city !== '') {
    if(match.params.keyword) {
      axios.get('https://localhost:4000/search',
        { params: { city: city, keyword: match.params.keyword, offset: 1 }})
        .then(res => {
          console.log('SearchPage에서 items Effect', res.data.items);
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items)));
        });
    }
    //2-(2) 검색 키워드가 없을때(처음 입장) 모든 자료 요청
    if(!match.params.keyword) {
      axios.get('https://localhost:4000/search',
        { params: { city: city, offset: 1}})
        .then(res => {
          console.log(res.data.items);
          console.log(getFormatedItems(res.data.items));
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items))); //검색결과 받아서 리덕스에 저장
        });
    }
    // }
          
    

    //3. socketio에 연결: 가격정보 수신 시 querySelector로 해당 부분의 가격을 변경한다.
    auctionSocket.on('bid', ({itemId, price}: bidData) => {
      console.log('receive bid', price);
      const priceDiv = document.querySelector(`#itemcard-${itemId}`) as Node;
      priceDiv.textContent = price.toString();
    });
    console.log('뒤로가기를 했을 때 SearchPage useeffect 실행되나요?');
  }, [],);
  console.log('SearchPage에서 city', items);

  // 인피니티 스크롤
  
  window.onscroll = function() {
    //window height + window scrollY 값이 document height보다 클 경우,
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      //실행할 로직 (콘텐츠 추가)
      count += 5;
      axios.get('https://localhost:4000/search',
        { params: { city: city, offset: count, keyword: match.params.keyword }})
        .then(res => {
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          if (!res.data.items) {
            dispatch(ItemHandler(getFormatedItems(items)));
          } else {
            dispatch(ItemHandler(getFormatedItems([...items, ...res.data.items]))); //검색결과 받아서 리덕스에 저장    
          }
        });

    }
  };
  


  return (
    <Container>
      {/* <LoadingModal isLoading={true}/> */}
      {
        items ? (items.map((item: Item) => 
          <ItemCard item={item} key={item.id}></ItemCard>
        )) : <></>
      }
    </Container>
  );
};



export default withRouter(SearchPage);
