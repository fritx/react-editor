// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';

export let App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
