import React, {useState} from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import {SearchInputHandler} from '../../redux/modules/SearchValue';
import {ItemHandler} from '../../redux/modules/Items';
import SearchBtn from './SearchBtn';
import axios from 'axios';
import './style/SearchBar.scss';

type SomeComponentProps = RouteComponentProps;

const SearchBar: React.FC<SomeComponentProps> = ({ history }) => {

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>('');

  console.log('inputValue', inputValue);

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    
    //1.searchPage에서 gps허용해서 X,Y좌표를 <리덕스에 저장>
    //2.리덕스에 있는 X,Y좌표 가져와서 handleSubmit실행될때 params로 좌표 넣어서 keyword랑 같이 보내기
    //3.검색결과 요청하고, 응답으로 받은 결과를 <리덕스에 상태로 저장>하기(그걸 searchPage에서 랜더해야함)
    //4.검색값을 리덕스에 저장(searchpage에서 나중에 무한스크롤 사용시 필요할 수 있기 때문에)

    axios.get('https://ttangttang.ml',
      { params: { gpsX: 1, gpsY: 15, keyword: inputValue }})
      .then(res => {
        // 리덕스 상태 만들어서 응답으로 온 검색결과 저장하기
        dispatch(ItemHandler(res.data.items)); //검색결과 받아서 리덕스에 저장
      });
    dispatch(SearchInputHandler(inputValue));
    // setInputValue(''); 없앨려고 했으나 당근마켓 보니까 검색값이 남아있음, 페이지 이동시에 html에서 vlaue와 동시에 없애야 할듯
    history.push('/ko/search'); //판매페이지에서 검색버튼 누르면 searchPage로 이동해야해서 필요
    console.log('요청보내기');
  };
  return (
    <div className="searchbar-container">
      <input className="searchbar" type="search" placeholder="Search" onChange={e => setInputValue(e.target.value)}/>
      <SearchBtn handleSubmit={handleSubmit}/>
    </div>
  );
};

export default withRouter(SearchBar);
