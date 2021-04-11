import React, {useState} from 'react';
import SearchBtn from './SearchBtn';
import { RouterProps, withRouter } from 'react-router';
import './style/SearchBar.scss';
import axios from 'axios';
import { getFormatedItems } from '../../modules/converters';
import { ItemHandler } from '../../redux/modules/Items';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';

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
      axios.get('https://localhost:4000/search',
        { params: { city: city, keyword: inputValue }})
        .then(res => {
          console.log('SearchPage에서 city', res.data.items[0].city);
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items))); 
        });
    }
    history.push(`/ko/search/${inputValue}`);
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
