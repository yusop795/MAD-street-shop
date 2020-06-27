import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, SignUpOwner, SignUpUser, Ranking, Landing, Account, SignUpComplet, MyPage, Splash, SearchResult, WatchList, Notice, Faq, OpenShop } from '../containers';
const Router = a => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup/account" component={Account} />
        <Route exact path="/signup/owner" component={SignUpOwner} />
        <Route exact path="/signup/user" component={SignUpUser} />
        <Route exact path="/signup/complet/:type" component={SignUpComplet} />
        <Switch>
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/openShop" component={OpenShop} />
          <Route exact path="/openShop/edit" component={OpenShop} />
          <Route exact path="/" component={Splash} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/ranking" component={Ranking} />
          <Route exact path="/watchList" component={WatchList} />
          <Route exact path="/myPage" component={MyPage} />
          <Route exact path="/myPage/user" component={SignUpUser} />
          <Route exact path="/myPage/owner" component={SignUpOwner} />
          <Route exact path="/notice" component={Notice} />
          <Route exact path="/faq" component={Faq} />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
