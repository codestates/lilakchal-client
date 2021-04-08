import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Chat from '../components/Chat';
import { RouterProps, withRouter } from 'react-router';

const Mypage: React.FC<RouterProps> = ({history}) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/ko/mypage/chat'>
          <Chat/>
        </Route>
        <Route path='/ko/mypage/auction'>
          <div>등록/입찰한 경매</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default withRouter(Mypage);
