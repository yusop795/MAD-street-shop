import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userTypes, userApiTypes } from '../reducers/userReducer';

import AlertUtil from '../util/AlertUtil.js';
import ModalPageUtill from '../util/ModalPageUtill.js';

import { Alert } from '../components/Alert';
import { Header } from '../components/Header';
import { FormGroup, InputText, Radio, ImgUploader } from '../components/FormGroup';
import { Button } from '../components/Unit';

import '../assets/styles/containers/signUpOwner.scss';
import { SettingCategory, SettingTime, SettingLocation } from './ModalPage';

const SignUpOwner = ({ history, match }) => {
  const dispatch = useDispatch();
  // 스토어 값 가져오기
  const userId = useSelector(state => state.userReducer.userId, '');
  const isUser = useSelector(state => state.userReducer.isUser);
  const storeLocation = useSelector(state => state.userReducer.storeLocation, {});
  const storeCategory = useSelector(state => state.userReducer.storeCategory, {});
  const storeOpenDays = useSelector(state => state.userReducer.storeOpenDays, {});
  const storeOpenTime = useSelector(state => state.userReducer.storeOpenTime, '');
  const storeCloseTime = useSelector(state => state.userReducer.storeCloseTime, '');
  const [userName, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [useMobile, setUseMobile] = useState(0);
  const [shopName, setShopName] = useState('');
  const [shopComment, setShopComment] = useState('');
  const [firstFiles, setFirstFiles] = useState('');
  const [files, setFiles] = useState('');

  // 모달
  const { isShowing, title, contents, setAlert } = AlertUtil();
  const { targetModalPage, isModalOpen, setModalPage } = ModalPageUtill();

  const submitData = () => {
    if (!userId || !storeLocation || !storeCategory || !storeOpenDays || !storeOpenTime || !storeCloseTime || !userName || !mobile || !useMobile || !shopName || !shopComment) {
      alert("가입 안됨")
      return false
    }
    // const formData = new FormData();
    // formData.append('file', firstFiles[0].imgFile);
    // if (files.length > 0) {
    //   files.map((v) => {
    //     formData.append('file', v.imgFile);
    //   })
    // }

    dispatch({
      type: userApiTypes.POST_SIGNUP_OWNER,
      payload: {
        userId,
        userName,
        mobile,
        useMobile: useMobile ? true : false,
        shopName,
        category: storeCategory,
        latitude: storeLocation.location.lat,
        longitude: storeLocation.location.long,
        locationComment: storeLocation.locationComment,
        shopComment,
        openDays: Object.keys(storeOpenDays).join(','),
        openTime: storeOpenTime,
        closeTime: storeCloseTime,
        useKakao: false,
      },
    })

    // dispatch({
    //   type: userApiTypes.POST_SIGNUP_OWNER_IMG,
    //   payload: {
    //     userId,
    //     shopId,
    //     files: formData,
    //   },
    // })
  }


  const rederModalPage = () => {
    switch (targetModalPage) {
      case 'SettingCategory':
        return <SettingCategory isOpen={isModalOpen} onEvent={setModalPage} />;
      case 'SettingTime':
        return <SettingTime isOpen={isModalOpen} onEvent={setModalPage} />;
      case 'SettingLocation':
        return <SettingLocation isOpen={isModalOpen} onEvent={setModalPage} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isUser) {
      history.push(`/signup/complet/owner`)
    }
  }, [isUser])


  return (
    <div className="main signUpOwner">
      <Header onEvent={history.goBack} />
      <h2 className="title">
        안녕하세요 <br />
        <b>사장님 계정</b>으로 매드스트릿샵<br />
        회원가입을 진행합니다<br />
      </h2>
      <FormGroup title={'기본 정보'} outline={true}>
        <InputText label={'이름'} onEvent={(e) => { setUserName(e.target.value) }} />
        <InputText label={'휴대전화 번호'} type="tel" onEvent={(e) => { setMobile(e.target.value) }} />
      </FormGroup>
      <FormGroup
        title={'가게 정보'}
        outline={true}
        info={'※ 가게 이름이 없는 경우 판매하는 음식명으로 대체 가능합니다.'}
      >
        <InputText label={'가게 이름'} onEvent={(e) => { setShopName(e.target.value) }} />
        <InputText
          label={'음식 카테고리'}
          type="openModal"
          selcetData={
            Object.keys(storeCategory).length > 0 ?
              {
                main: storeCategory.title,
                sub: storeCategory.item.join(','),
              }
              : null
          }
          onEvent={() => {
            setModalPage({
              target: 'SettingCategory',
            });
          }}
        />
        <InputText
          label={'주 영업 위치'}
          selcetData={{ main: storeLocation.address, sub: storeLocation.locationComment }}
          type="openModal"
          onEvent={() => {
            setModalPage({
              target: 'SettingLocation',
            });
          }}
        />
        <InputText
          label={'주 영업 시간'}
          type="openModal"
          selcetData={
            Object.keys(storeOpenDays).length > 0 ?
              {
                main: `${Object.keys(storeOpenDays).join(',')} ${storeOpenTime} ~ ${storeCloseTime}`
              }
              : null
          }
          onEvent={() => {
            setModalPage({
              target: 'SettingTime',
            });
          }}
        />
        <InputText label={'매장소개'} type="textarea" onEvent={(e) => { setShopComment(e.target.value) }} />
      </FormGroup>
      <FormGroup title={'휴대폰 번호 노출 여부'} info={'※ 휴대폰 번호 노출 선택 시 가게정보에 함께 노출됩니다.'}>
        <Radio
          index={1}
          data={{ title: '노출' }}
          selectItem={useMobile}
          setSelectItem={setUseMobile}
        />
        <Radio
          index={0}
          data={{ title: '미노출' }}
          selectItem={useMobile}
          setSelectItem={setUseMobile}
        />
      </FormGroup>
      <ImgUploader setFiles={setFirstFiles} multiple={false} title={'대표이미지 등록'} info={'※ 가게를 대표하는 사진을 등록해주세요.'} />
      <ImgUploader setFiles={setFiles} title={'사진 등록'} info={'※ 10장 이내의 사진을 등록해주세요. <b>판매하는 음식사진이나, 가게 전경, 영업 위치가 찍힌 사진</b>을 등록하면 판매에 도움이 됩니다.'} />
      <Button
        active={true}
        onEvent={submitData}
        text={'완료'}
      />
      <Alert isShowing={isShowing} hide={setAlert} title={title} contents={contents} />
      {rederModalPage()}
    </div>
  );
};

export default withRouter(SignUpOwner);
