import React, {useEffect} from 'react';
import { useDispatch, } from 'react-redux';
import { UserInfoHandler } from '../redux/modules/UserInfo';
import { LoginHandler } from '../redux/modules/account';
import axios from 'axios';

const SearchPage:React.FC = () => {

  const dispatch = useDispatch();

  const oauthLoginHandler = (authorizationCode: string) => {
    axios.post('https://localhost:4000/user/oauth',
      { authorizationCode },
      {withCredentials: true})
      .then(res => {
        console.log('res.data = ', res.data);
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
    <div>
      
    </div>
  );
};

export default SearchPage;
