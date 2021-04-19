import * as React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import SearchPage from './SearchPage';
import RegisterPage from './RegisterPage';
import Mypage from './Mypage';
import Header from '../components/Navigation/Header';
import { RouterProps, withRouter } from 'react-router';
import './style/MainPage.scss';

const Main:React.FC<RouterProps> = ({ history }) => {
  return (
    <Router history={history}>
      <div className='main-container'>
        <Header/>
        <div className='main-content'>
          <Switch>
            <Route path='/ko/register'>
              <RegisterPage/>
            </Route>
            <Route path='/ko/mypage'>
              <Mypage/>
            </Route>
            <Route exact path={['/ko/search', '/ko/search/:keyword']}>
              <SearchPage/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default withRouter(Main);