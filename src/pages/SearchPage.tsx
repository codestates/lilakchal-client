import React, {useEffect} from 'react';
import { useDispatch, useSelector, RootStateOrAny  } from 'react-redux';
import { UserInfoHandler } from '../redux/modules/UserInfo';
import { LoginHandler } from '../redux/modules/account';
//import {initialState} from '../redux/modules/Items';
import ItemCard from '../components/ItemCard/index';
import {Container} from './style/SearchPageStyle';
import {Item} from '../redux/modules/Items';

import axios from 'axios';

const SearchPage:React.FC = () => {

  const itemState = useSelector((state:RootStateOrAny) => state.ItemReducer);
  const {items} = itemState;
  const dispatch = useDispatch();

  const oauthLoginHandler = (authorizationCode: string) => {
    axios.post('https://ttangttang.ml/user/oauth', { authorizationCode: authorizationCode })
      .then(res => {
        dispatch(UserInfoHandler({id: res.data.id, kakaoId: res.data.kakaoId, name: res.data.name})); //서버로부터 응답받으면 리덕스에 정보 저장
        dispatch(LoginHandler(true)); // 정보 저장하고 isLogin true로 (마이페이지 보이도록)
      });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      console.log(authorizationCode);
      oauthLoginHandler(authorizationCode);
    }
  }, []);
    
  return (
    <Container>
      {
        items ? (items.map((item: Item) => 
          <ItemCard item={item}></ItemCard>
        )) : <></>
      }
    </Container>
  );
};

export default SearchPage;
