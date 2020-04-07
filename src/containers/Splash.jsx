import React, {useState, useEffect, useRef} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { Redirect , withRouter } from 'react-router-dom';

import { startTypes } from '../reducers/startReducer';

import '../assets/styles/containers/splash.scss';
import imgLogoTruck from '../assets/imgs/imgLogoTruck.png';

const Splash = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector(state => state.startReducer.shopCategory, []);
  const [allState, setAllState] = useState(false);

  useEffect(() => { 
    dispatch({
      type: startTypes.FETCH_SHOP_CATEGORY,
    });
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
