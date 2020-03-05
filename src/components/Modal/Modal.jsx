import React from 'react';
import './style.scss';


const Modal = ({isShowing, hide, title, contents}) => {
  

  return isShowing?(
    <div className="modal">
      <div className="modalBox">
        <h5>{title}</h5>
        <p dangerouslySetInnerHTML={{__html: contents}}></p>
        <div className="modalBtn" onClick={hide}>확인</div>
      </div>
    </div>
  ):null
};

export default Modal;
