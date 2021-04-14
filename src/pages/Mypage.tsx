import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Chat from '../components/Chat';
import { RouterProps, withRouter } from 'react-router';

import Auction from '../components/MyAuction/Auction';

const Mypage: React.FC<RouterProps> = ({history}) => {

  return (
    <Router history={history}>
      <Switch>
        <Route path='/ko/mypage/chat'>
          <Chat/>
        </Route>
        <Route exact path='/ko/mypage/auction'>
          <Auction/>
        </Route>
      </Switch>
    </Router>
  );
};

export default withRouter(Mypage);
