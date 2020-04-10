import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, SignUpOwner, SignUpUser, Ranking, Test, Account, SignUpComplet, MyPage, Splash, SearchResult } from '../containers';
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
        <Route exact path="/signup/account" component={Account} />
        <Route exact path="/signup/owner" component={SignUpOwner} />
        <Route exact path="/signup/user" component={SignUpUser} />
        <Route exact path="/signup/complet/:type" component={SignUpComplet} />
        <Switch>
          <Route exact path="/test" component={Test} />
          <Route exact path="/" component={Splash} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/ranking" component={Ranking} />
          <Route exact path="/myPage" component={MyPage} />
          <Route exact path="/searchResult" component={SearchResult} />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
