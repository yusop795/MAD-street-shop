import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home,SignUp } from '../containers';
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signUp">
        <SignUp/>
      </Route>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Switch>
  </BrowserRouter>
);

export default Router;