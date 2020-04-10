import React, {useState, useEffect, useRef} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { Redirect , withRouter } from 'react-router-dom';

// import AuthUtill from '../util/AuthUtill'

import { startTypes } from '../reducers/startReducer';
import { userTypes } from '../reducers/userReducer';
import '../assets/styles/containers/splash.scss';
import imgLogoTruck from '../assets/imgs/imgLogoTruck.png';

const KAKAO = window.Kakao

const Splash = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector(state => state.startReducer.shopCategory, []);
  const token = useSelector(state => state.userReducer.token, {});   
  const [allState, setAllState] = useState(false);

  // const {setToken} = AuthUtill();

  useEffect(() => { 
    dispatch({
      type: startTypes.FETCH_SHOP_CATEGORY,
    });
    // if(KAKAO.Auth.getAccessToken()){
    //   dispatch({
    //     type: userTypes.SET_LOGIN,
    //     payload: {
    //       token: {
    //         accessToken: KAKAO.Auth.getAccessToken(),
    //       },
    //       isLogin: true
    //     },
    //   })
    // } 
  },[]);

  useEffect(() => { 
    if(categoryList.length > 0){
      setAllState(true)
    }

  },[categoryList]);

  return (allState ? (
    <Redirect to="/test"/>
  ) : (
    <div className="main splash">
      <img src={imgLogoTruck} alt=""/>
      <div className="loadingBar">
        <span className="span"/>
      </div>
    </div>
  ));
};

export default withRouter(Splash);
