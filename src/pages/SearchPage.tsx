import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { UserInfoHandler } from '../redux/modules/UserInfo';
import { LoginHandler } from '../redux/modules/account';
import {initialState} from '../redux/modules/Items';
import ItemCard from '../components/ItemCard/index';

import axios from 'axios';

const SearchPage:React.FC = () => {

  const dispatch = useDispatch();

  const oauthLoginHandler = (authorizationCode: string) => {
    axios.post('https://ttangttang.ml/user/oauth', { authorizationCode: authorizationCode })
      .then(res => {
        dispatch(UserInfoHandler(res.data)); //서버로부터 응답받으면 리덕스에 정보 저장
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
    <div>
      검색 페이지
      <ItemCard item={initialState.items[0]}></ItemCard>
    </div>
  );
};

export default SearchPage;
