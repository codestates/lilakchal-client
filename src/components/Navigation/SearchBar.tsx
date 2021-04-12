import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProps, withRouter } from 'react-router';
import axios from 'axios';
import dotenv from 'dotenv';
// import {ItemHandler} from '../../redux/modules/Items';
import SearchBtn from './SearchBtn';
import './style/SearchBar.scss';
// import { getFormatedItems } from '../../modules/converters';
import { RootState } from '../../redux/modules/reducer';
import { getFormatedItems } from '../../modules/converters';
import { ItemHandler } from '../../redux/modules/Items';


dotenv.config();

const SearchBar: React.FC<RouterProps> = ({history}) => {

  const [inputValue, setInputValue] = useState<string>('');
  const userInfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { city } = userInfoState;
  const dispatch = useDispatch();

  const handleKeyPress = (e: { key: string; }) => {
    if(e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    
    // window.location.href = `/ko/search/${inputValue}`;

    

    if(inputValue) {
      axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/search`,
        { params: { city: city, keyword: inputValue, offset: 1 }})
        .then(res => {
          console.log('검색할때 city가 있나요?', city);
          console.log('SearchPage에서 city', res.data.items);
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items))); 
          history.push(`/ko/search/${inputValue}`);
          
        });
    }
    
    // window.location.href = `/ko/search/${inputValue}`;
    
    console.log('요청보내기');
  };
  
  return (
    <div className="searchbar-input">
      <input id="searchbar" type="search" placeholder="Search" onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress}/>
      <SearchBtn handleSubmit={handleSubmit}/>
    </div>
  );
};

export default withRouter(SearchBar);
