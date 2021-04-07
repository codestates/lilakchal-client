import * as React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import SearchPage from './SearchPage';
import RegisterPage from './RegisterPage';
import Mypage from './Mypage';
import Header from '../components/Navigation/Header';
import { RouterProps, withRouter } from 'react-router';


const Main:React.FC<RouterProps> = ({ history }) => {

  return (
    <Router history={history}>
      <Header/>
      <Switch>
        <Route path='/ko/register'>
          <RegisterPage/>
        </Route>
        <Route path='/ko/mypage'>
          <Mypage/>
        </Route>
        <Route path='/ko/search'>
          <SearchPage/>
        </Route>
      </Switch>
    </Router>
  );
};

export default withRouter(Main);