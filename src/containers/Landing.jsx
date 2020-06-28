import React from 'react';
import { withRouter } from 'react-router-dom';
import { ModalHeader } from '../components/Header';
import landing01 from '../assets/imgs/landing01.png'
import landing02 from '../assets/imgs/landing02.png'
import landing03 from '../assets/imgs/landing03.png'
import landing04 from '../assets/imgs/landing04.png'
import landing05 from '../assets/imgs/landing05.png'

const Landing = ({ history }) => {
  return (
    <div className="main landingBox" >
      <ModalHeader onEvent={history.goBack} border={false} title="서비스 소개" />
      <img src={landing01} alt="가게 사진" />
      <img src={landing02} alt="가게 사진" />
      <img src={landing03} alt="가게 사진" />
      <img src={landing04} alt="가게 사진" />
      <img src={landing05} alt="가게 사진" />
    </div>
  );
};

export default withRouter(Landing);
