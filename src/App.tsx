import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../src/main';
import LandingPage from './pages/LandingPage';

const App:React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <LandingPage/>
        </Route>
        <Route path='/main'>
          <Main/>
        </Route>
      </Switch>
    </>
  );
};

export default App;
