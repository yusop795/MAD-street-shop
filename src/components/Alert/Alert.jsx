import React from 'react';
import windowUtil from '../../util/windowUtil'
import './style.scss';


const Alert = ({isShowing, hide, title, contents, height = windowUtil.useWindowSize().height}) => {
  
  return isShowing?(
    <div className="alert" style={{height}}>
      <div className="alertBox">
        <h5>{title}</h5>
        <p dangerouslySetInnerHTML={{__html: contents}} />
        <div className="alertBtn" onClick={hide}>확인</div>
      </div>
    </div>
  ):null
};

export default Alert;
