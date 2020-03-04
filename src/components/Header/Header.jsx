import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from "react-router-dom";
import './style.scss';
import iconBack from '../../assets/imgs/iconBack.png';

const Header = ({goBack, title}) => {
  return (
    <div className="header">
      <div onClick={goBack}><img src={iconBack} /></div>
      <div>{(title)?title:''}</div>
      <div>{''}</div>
    </div>
  );
};

export const ModalHeader = ({goBack}) => {
  return (
    <div className="header">
      <div onClick={goBack}><img src={iconBack} /></div>
    </div>
  );
};

export default Header;
