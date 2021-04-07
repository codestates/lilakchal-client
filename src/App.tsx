import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import LandingPage from './pages/LandingPage';

const App:React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <LandingPage/>
        </Route>
        <Route path='/ko'>
          <Main/>
        </Route>
      </Switch>
    </>
  );
};

export default App;
