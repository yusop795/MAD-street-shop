import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// utill
import AlertUtil from '../util/AlertUtil';

import { ModalHeader } from '../components/Header';
import { InputTag } from '../components/FormGroup';
import { Button } from '../components/Unit';
import { Alert } from '../components/Alert';
import '../assets/styles/containers/signUpUser.scss';
import Spinner from "../components/Unit/Spinner";

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { userTypes, userApiTypes } from '../reducers/userReducer';



const SignUpUser = ({ history }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userReducer.userInfo, shallowEqual);
  const isUser = useSelector(state => state.userReducer.isUser, shallowEqual);
  const userId = useSelector(state => state.userReducer.userId, shallowEqual);
  const userLoading = useSelector(state => state.userReducer.userLoading, shallowEqual);

  const categoryList = useSelector(state => state.startReducer.shopCategory, []);
  const [selectCategory, setSelectCategory] = useState(1);
  const [tagList, setTagList] = useState([]);
  const [selectTag, setSelectTag] = useState(userInfo.userTags || {});
  const [signUpUserCall, setsignUpUserCall] = useState(false);

  // alert
  const { isShowing, title, contents, setAlert } = AlertUtil();
  // tag 선택 기능
  useEffect(() => {
    if (categoryList.length > 0) {
      setTagList(categoryList[selectCategory - 1].item)
    }
  }, [categoryList, selectCategory]);

  const onChangeTag = (tag) => {
    const tags = Object.keys(selectTag)
    if (!tags.includes(tag)) {
      if (tags.length > 2) {
        setAlert({
          contents: '대표메뉴는 최대 3개까지만<br/> 선택할 수 있어요.'
        })
      } else {
        console.log(selectCategory)
        const key = selectCategory - 1
        const data = { ...selectTag, [tag]: categoryList[key].title }
        setSelectTag(data)
      }
    } else {
      delete selectTag[tag]
      setSelectTag({ ...selectTag })
    }
  }

  // 데이터 전송
  const submitData = () => {
    const data = {};
    Object.keys(selectTag).map((v, i) => {
      let tags = data[selectTag[v]]
      if (tags && tags.length > 0) {
        data[selectTag[v]] = data[selectTag[v]].concat(v);
      } else {
        data[selectTag[v]] = [v]
      }
    })
    const userTags = Object.keys(data).map((v) => {
      return {
        title: v,
        item: data[v]
      }
    })

    dispatch({
      type: userTypes.USER_LODING,
      payload: {
        userLoading: true
      }
    })

    if (history.location.pathname === "/myPage/user") {
      // 사용자 정보수정
      dispatch({
        type: userApiTypes.PUT_USER,
        payload: {
          userId,
          userTags
        }
      })
    } else {
      // 사용자 가입
      dispatch({
        type: userApiTypes.POST_SIGNUP_USER,
        payload: {
          userId,
          userTags
        }
      })
    }
    setsignUpUserCall(true)
  }

  useEffect(() => {
    console.log(userLoading, isUser, history.location.pathname)
    if (signUpUserCall && !userLoading && isUser) {
      if (history.location.pathname !== "/myPage/user") {
        history.push(`/signup/complet/user`)
      } else {
        history.goBack()
      }
    }
  }, [userLoading])

  return (
    <div className="main signUpUser">
      <ModalHeader onEvent={history.goBack} title={'취향 설정'} />
      <div className="titleBox"> 가장 좋아하는 음식 3가지를<br />알려주세요 </div>
      <div className="categoryBox">
        <div className="sideCategoryBox">
          {
            categoryList.map((v, i) => {
              return (
                <div onClick={() => setSelectCategory(i + 1)} className={`category ${(i + 1 === selectCategory) ? 'active' : ''}`} key={i}>
                  <div className="icon">{v.icon}</div>
                  <span className="title" dangerouslySetInnerHTML={{ __html: v.title.replace('/', '<br/>') }} />
                </div>
              )
            })
          }
        </div>
        <div className="menuTagBox">
          <InputTag
            item={tagList}
            selectTag={selectTag}
            onEvent={onChangeTag}
          />
        </div>
      </div>
      <Button
        fullmode={true}
        active={Object.keys(selectTag).length === 3}
        bottom={true}
        onEvent={submitData}
        text={`선택 완료(${Object.keys(selectTag).length}/3)`}
      />
      <Alert isShowing={isShowing} hide={setAlert} title={title} contents={contents} />
      {userLoading ? <Spinner /> : null}
    </div>
  );
};

export default withRouter(SignUpUser);
