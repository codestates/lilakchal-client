import React, {useState} from 'react';
import SearchBtn from './SearchBtn';
import './style/SearchBar.scss';

const SearchBar: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyPress = (e: { key: string; }) => {
    if(e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    
    window.location.href = `/ko/search/${inputValue}`;
    console.log('요청보내기');
  };
  
  return (
    <div className="searchbar-input">
      <input id="searchbar" type="search" placeholder="Search" onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress}/>
      <SearchBtn handleSubmit={handleSubmit}/>
    </div>
  );
};

export default SearchBar;
