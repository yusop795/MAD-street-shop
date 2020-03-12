import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, SignUp } from '../containers';
import { SettingCategory, SettingTime } from '../containers/ModalPage';
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
        <Route exact path="/signup/:type" component={SignUp} />
        <Route exact path="/settingCategory" component={SettingCategory} />
        <Route exact path="/settingTime" component={SettingTime} />
        <Route exact path="/settingLocation" component={SettingTime} />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
