import React, { useEffect } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Chat from '../components/Chat';
import { RouterProps, withRouter } from 'react-router';

import Action from '../components/MyAuction/Action';
import { useSelector, RootStateOrAny } from 'react-redux';

const Mypage: React.FC<RouterProps> = ({history}) => {

  const itemState = useSelector((state:RootStateOrAny) => state.ItemReducer);
  const {items} = itemState;

  useEffect(() => {
    if(items !== items) {
      history.push('/mypage/auction');
    }
  }, [items]);

  return (
    <Router history={history}>
      <Switch>
        <Route path='/ko/mypage/chat'>
          <Chat/>
        </Route>
        <Route exact path='/ko/mypage/auction'>
          <Action/>
        </Route>
      </Switch>
    </Router>
  );
};

export default withRouter(Mypage);
