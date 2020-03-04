import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authTypes } from '../reducers/authReducer';
import { Home, SignUp } from '../containers';

const Router = a => {
  const dispatch = useDispatch();
  // 스토어 값 가져오기
  const loading = useSelector(({ authReducer }) => authReducer.loading, true);

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
        <Route exact path="/signup/:type">
          <SignUp />
        </Route>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
