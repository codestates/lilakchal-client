import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="searchbar-container">
      <input className="searchbar" type="search" placeholder="Search"/>
    </div>
  );
};

export default SearchBar;