import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Navigation/Header';

const SearchPage: React.FC = () => {
  return (
    <BrowserRouter>
      <Header/>
    </BrowserRouter>
  );
};

export default SearchPage;