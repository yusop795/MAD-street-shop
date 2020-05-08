import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userTypes, userApiTypes } from '../../reducers/userReducer';
// utill
import AlertUtil from '../../util/AlertUtil.js';
// components
import { ModalHeader } from '../../components/Header';
import { Alert } from '../../components/Alert';
import { RadioCategory, InputTag } from '../../components/FormGroup';
import { Button } from '../../components/Unit';
// style
import '../../assets/styles/containers/setting.scss';

const SettingCategory = ({ isOpen, onEvent }) => {
  const modalPage = useRef();

  const dispatch = useDispatch();
  const categoryList = useSelector(state => state.startReducer.shopCategory, []);
  const [selectCategory, setSelectCategory] = useState(0);
  const [tagList, setTagList] = useState([]);
  const [selectTag, setSelectTag] = useState([]);

  // Alert
  const { isShowing, title, contents, setAlert } = AlertUtil();

  // 카테고리 선택
  useEffect(() => {
    if (selectCategory) {
      setTagList(categoryList[selectCategory - 1].item)
      setSelectTag([])
    }
  }, [categoryList, selectCategory]);

  // 모달 오픈 애니메이션
  useEffect(() => {
    if (isOpen) {
      modalPage.current.style = 'transform: translateY(0)'
      modalPage.current.scrollTop = 0
    }
  }, [isOpen]);

  // 태그 선택
  const onChangeTag = (tag) => {
    const tags = Object.keys(selectTag)
    if (!tags.includes(tag)) {
      if (tags.length > 2) {
        setAlert({
          contents: '대표메뉴는 최대 3개까지만<br/> 선택할 수 있어요.'
        })
      } else {
        const key = selectCategory - 1
        const data = { ...selectTag, [tag]: categoryList[key].title }
        setSelectTag(data)
      }
    } else {
      delete selectTag[tag]
      setSelectTag({ ...selectTag })
    }
  }

  const setData = () => {
    dispatch({
      type: userTypes.SET_STORE_CATEGORY,
      payload: {
        category: {
          title: categoryList[selectCategory - 1].title,
          item: Object.keys(selectTag)
        }
      },
    });
  }


  return (
    <div ref={modalPage} className={`main settingCategory modalPage ${isOpen ? 'open' : ''}`}>
      <ModalHeader onEvent={onEvent} title={'카테고리 설정'} />
      <div className="settingInfoBox">
        <h2 className="settingInfoTitle">판매하는 음식을 선택하세요</h2>
        <p className="settingInfo">카테고리는 <b>1개</b>, 대표메뉴는 <b>최대 3개</b>까지<br />선택가능</p>
      </div>
      <RadioCategory
        title={'카테고리 선택'}
        item={categoryList}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
      />
      {selectCategory ?
        <InputTag
          title={'대표메뉴 선택'}
          item={tagList}
          selectTag={selectTag}
          onEvent={onChangeTag}
        />
        : null}
      <Button active={Object.keys(selectTag).length >= 1} onEvent={setData} text={'저장'} />
      <Alert isShowing={isShowing} hide={setAlert} title={title} contents={contents} height={modalPage.current?.scrollHeight} />
    </div>
  );
};

export default SettingCategory;

