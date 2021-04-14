import * as React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import MyoptionGroup from './MyoptionGroup';
import DefaultGroup from './DefaultGroup';

const MenuGroup:React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/ko/mypage'>
          <MyoptionGroup/>
        </Route>
        <Route path={['/ko/search', '/ko/register']}>
          <DefaultGroup/>
        </Route>
      </Switch>
    </Router>
  );
};

export default withRouter(MenuGroup);