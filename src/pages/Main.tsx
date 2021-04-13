import * as React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import SearchPage from './SearchPage';
import RegisterPage from './RegisterPage';
import Mypage from './Mypage';
import Header from '../components/Navigation/Header';
import { RouterProps, withRouter } from 'react-router';
import {Content, Container} from './style/MainPageStyle';


const Main:React.FC<RouterProps> = ({ history }) => {

  console.log('뒤로가기 하면 main페이지가 재랜더링 되나요?', history);

  return (
    <Router history={history}>
      <Container>
        <Header/>
        <Content>
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
        </Content>
      </Container>
    </Router>
  );
};

export default withRouter(Main);