import React from 'react';
import SearchBar from './SearchBar';
import Location from './Location';

const SearchContainer: React.FC = () => {
  return (
    <div className='search-container'>
      <SearchBar/>
      <div className='location-container'>
        <Location/>
      </div>
    </div>
  );
};

export default SearchContainer;