import React, {useState} from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import {SearchInputHandler} from '../../redux/modules/SearchValue';
import {ItemHandler} from '../../redux/modules/Items';
import SearchBtn from './SearchBtn';
import axios from 'axios';
import './style/SearchBar.scss';
import { getFormatedItems } from '../../modules/converters';

type SomeComponentProps = RouteComponentProps;

const SearchBar: React.FC<SomeComponentProps> = ({ history, match }) => {

  const dispatch = useDispatch();
  const LocationState = useSelector((state: RootState) => state.UserInfoReducer);
  const { city } = LocationState;
  const [inputValue, setInputValue] = useState<string>('');

  console.log('inputValue', inputValue);

  const handleKeyPress = (e: { key: string; }) => {
    if(e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    
    //1.searchPage에서 gps허용해서 X,Y좌표를 <리덕스에 저장>
    //2.리덕스에 있는 X,Y좌표 가져와서 handleSubmit실행될때 params로 좌표 넣어서 keyword랑 같이 보내기
    //3.검색결과 요청하고, 응답으로 받은 결과를 <리덕스에 상태로 저장>하기(그걸 searchPage에서 랜더해야함)
    //4.검색값을 리덕스에 저장(searchpage에서 나중에 무한스크롤 사용시 필요할 수 있기 때문에)
    // window.location.href = `/ko/search/${inputValue}`;

    if(inputValue !== '') {
      
      axios.get('https://localhost:4000/search',
        { params: { city: city, keyword: inputValue }})
        .then(res => {
          console.log(res.data.items);
          console.log(getFormatedItems(res.data.items));
          // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
          dispatch(ItemHandler(getFormatedItems(res.data.items))); //검색결과 받아서 리덕스에 저장
          window.location.href = `/ko/search/${inputValue}`;
          // history.push(`/ko/search/${inputValue}`);
        });
      dispatch(SearchInputHandler(inputValue));
      
      console.log('요청보내기');
    }
  };
  return (
    <div className="searchbar-input">
      <input id="searchbar" type="search" placeholder="Search" onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress}/>
      <SearchBtn handleSubmit={handleSubmit}/>
    </div>
  );
};

export default withRouter(SearchBar);
