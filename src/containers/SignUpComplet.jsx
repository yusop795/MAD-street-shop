import React from 'react';
import { withRouter } from 'react-router-dom';
import { RoundButton, IconBox } from '../components/Unit';

import imgLogoTruck from '../assets/imgs/imgLogoTruck.png';

import '../assets/styles/containers/signUpComplet.scss';

const SignUpComplet = ({ history, match }) => {
  const contents = match.params.type === 'owner' ? `가게 정보를 등록하면<br />손님들이 지도를 보고 찾아올거에요:)` : `이제 내 주변의 스트릿푸드를<br />쉽고 빠르게 찾을 수 있어요:)`;

  return (
    <div className="signUpComplet">
      <img src={imgLogoTruck} />
      <h1>매드스트릿샵<br />회원가입을 환영합니다!</h1>
      <p dangerouslySetInnerHTML={{ __html: contents }}></p>
      <RoundButton text={"확인"} onEvent={() => history.push('/')} />
      <IconBox />
    </div>
  );
};

export default withRouter(SignUpComplet);
