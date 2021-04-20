import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProps, withRouter } from 'react-router';
import dotenv from 'dotenv';
import SearchBtn from './SearchBtn';
import './style/SearchBar.scss';
import { RootState } from '../../redux/modules/reducer';
import { getFormatedItems } from '../../modules/converters';
import {requestSearchItems} from '../../modules/request';
import { ItemHandler, UnformatedItem } from '../../redux/modules/Items';
import ConstantString from '../../modules/strings';


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

  const requestSearchedItemCallback = (items:Array<UnformatedItem>) => {
    dispatch(ItemHandler(getFormatedItems(items)));
    history.push(`/ko/search/${inputValue}`);
  };

  const handleSubmit = async () => {
    if(inputValue) {
      requestSearchItems({ params: { city: city, keyword: inputValue, offset: 0 }}, requestSearchedItemCallback);
    }
  };
  
  return (
    <div className="searchbar-input">
      <input id="searchbar" type="search" placeholder={ConstantString.searchPlaceHolder} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress}/>
      <SearchBtn handleSubmit={handleSubmit}/>
    </div>
  );
};

export default withRouter(SearchBar);
