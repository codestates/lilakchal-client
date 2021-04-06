import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SearchPage from './SearchPage';
import Header from '../components/Navigation/Header';

const Main:React.FC = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path='/search'>
          <SearchPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Main;