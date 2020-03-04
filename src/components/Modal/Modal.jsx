import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from "react-router-dom";
import './style.scss';


const Modal = ({isShowing, hide, title, contents}) => {
  

  return isShowing?(
    <div className="modal">
    <div className="modalBox">
        {title}
        {contents}
        <div className="modalBtn" onClick={hide}>확인</div>
      </div>
    </div>
  ):null
};

export default Modal;
