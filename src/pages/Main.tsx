import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import SearchPage from './SearchPage';
import Header from '../components/Navigation/Header';
import { RouterProps, withRouter } from 'react-router';
import './style/MainPage.scss';
import LoadingModal from '../components/Modal/LoadingModal';

const RegisterPage = lazy(() => import('./RegisterPage'));
const Mypage = lazy(() => import('./Mypage'));

const Main:React.FC<RouterProps> = ({ history }) => {

  useEffect(() => { 
    import ('./RegisterPage');
    import ('./Mypage');
  }, []);

  return (
    <Router history={history}>
      <Suspense fallback={<LoadingModal isLoading={true} />}>
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
      </Suspense>
    </Router>
  );
};

export default withRouter(Main);