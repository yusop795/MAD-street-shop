import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector} from 'react-redux';

// utill
import AlertUtil from '../util/AlertUtil.js';

import { ModalHeader } from '../components/Header';
import { InputTag } from '../components/FormGroup';
import { Button } from '../components/Unit';
import { Alert } from '../components/Alert';
import '../assets/styles/containers/signUpUser.scss';

const SignUpUser = ({ history }) => {
  const categoryList = useSelector(state => state.startReducer.shopCategory, []);  
  const [selectCategory, setSelectCategory] = useState(1);
  const [tagList, setTagList] = useState([]);
  const [selectTag, setSelectTag] = useState([]);

  useEffect(() => {
    if(categoryList.length > 0){
      setTagList(categoryList[selectCategory-1].item)
    }
  },[categoryList,selectCategory]);


  // alert
  const { isShowing, title, contents, setAlert} = AlertUtil();

  const onChangeTag = (tag) => {
    if(!selectTag.includes(tag)){
      if(selectTag.length > 2) {
        setAlert({
          contents:'대표메뉴는 최대 3개까지만<br/> 선택할 수 있어요.'
        })
      }else {
        setSelectTag([...selectTag, tag])
      }
    }else {
      selectTag.splice(selectTag.indexOf(tag),1)
      setSelectTag([...selectTag])
    }
  }

  return (
    <div className="main signUpUser">
      <ModalHeader onEvent={history.goBack} title={'취향 설정'} />
      <div className="titleBox"> 가장 좋아하는 음식 3가지를<br/>알려주세요 </div>
      <div className="categoryBox">
        <div className="sideCategoryBox">
          {
            categoryList.map((v,i)=>{
              return (
                <div onClick={()=>setSelectCategory(i+1)} className={`category ${(i+1 === selectCategory)?'active': ''}`} key={i}>
                  <div className="icon">{v.icon}</div>
                  <span className="title" dangerouslySetInnerHTML={{__html: v.title.replace('/','<br/>')}} />
                </div>
            )})
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
        active={selectTag.length === 3} 
        bottom={true} 
        onEvent={null} 
        text={`선택 완료(${selectTag.length}/3)`}
      />
      <Alert isShowing={isShowing} hide={setAlert} title={title} contents={contents}/>
    </div>
  );
};

export default withRouter(SignUpUser);
