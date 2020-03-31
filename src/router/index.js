import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, SignUp, Ranking, Test, Account, SignUpComplet } from '../containers';
const Router = a => {
  // 마운트 될 때 한번
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch({
  //       type: authTypes.SET_LOADING,
  //       payload: { loading: false },
  //     });
  //   }, 5000);
  //   console.log('HOME_Mount');
  //   return () => {
  //     console.log('HOME_unMount');
  //   };
  // }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/account" component={Account} />
        <Route exact path="/signup/:type" component={SignUp} />
        <Route exact path="/complet/:type" component={SignUpComplet} />
        <Switch>
          <Route exact path="/" component={Test} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/ranking" component={Ranking} />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
