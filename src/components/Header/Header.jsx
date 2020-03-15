import React from 'react';
import './style.scss';
import iconBack from '../../assets/imgs/iconBack.png';
import btnClose from '../../assets/imgs/btnClose.png';

const Header = ({goBack, title = ''}) => {
  return (
    <div className="header">
      <div onClick={goBack}><img src={iconBack} alt={'뒤로가기'}/></div>
      <h2 className="headerTitle">{(title)?title:''}</h2>
      <div>{''}</div>
    </div>
  );
};

export const ModalHeader = ({goBack, title = ''}) => {
  return (
    <div className="header modalHeader">
      <div onClick={goBack}><img src={btnClose} alt="btnClose"/></div>
      <h2 className="headerTitle">{(title)?title:''}</h2>
      <div>{''}</div>
    </div>
  );
};

export default Header;
