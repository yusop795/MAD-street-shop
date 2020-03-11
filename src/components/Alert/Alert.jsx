import React from 'react';
import './style.scss';


const Alert = ({isShowing, hide, title, contents}) => {
  

  return isShowing?(
    <div className="alert">
      <div className="alertBox">
        <h5>{title}</h5>
        <p dangerouslySetInnerHTML={{__html: contents}}></p>
        <div className="alertBtn" onClick={hide}>확인</div>
      </div>
    </div>
  ):null
};

export default Alert;
