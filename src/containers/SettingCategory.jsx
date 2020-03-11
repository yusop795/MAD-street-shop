import React, {useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
// utill
import ModalUtil from '../util/ModalUtil.js';
// common components
import { ModalHeader } from '../components/Header';
import { Modal } from '../components/Modal';
// components
import { RadioCategory, InputTag } from '../components/FormGroup';
// style
import '../assets/styles/containers/setting.scss';

const SettingCategory = ({history}) => {
  const [categoryList] = useState([{"title":"붕어빵/국화빵","item":["땅콩빵","호두과자","붕어빵","계란빵","국화빵","호떡"]},{"title":"타코야끼","item":["타코야끼"]},{"title":"샌드위치","item":["토스트","햄버거","샌드위치","타코","브리또","케밥","음료"]},{"title":"핫도그","item":["핫도그"]},{"title":"분식","item":["떡볶이","순대","오뎅","만두","김밥","찐빵","튀김","음료","컵밥","주먹밥"]},{"title":"면류","item":["쌀국수","라면","우동","짬뽕","짜장면","파스타"]},{"title":"구황작물","item":["군밤","군고구마","옥수수","알감자"]},{"title":"철판요리","item":["순대볶음","곱창볶음","야끼소바","오꼬노미야끼","스테이크"]},{"title":"튀김류","item":["새우튀김","오징어튀김","탕수육","닭강정"]},{"title":"디저트","item":["츄러스","아이스크림","솜사탕","음료","탕후루","마카롱","케이크"]},{"title":"음료","item":["커피","생과일쥬스","슬러시","코코넛","차","버블티"]},{"title":"꼬치류","item":["닭꼬치","떡꼬치","소세지꼬치","소떡소떡","핫바","회오리감자","염통꼬치"]},{"title":"도넛류","item":["꽈배기","찹쌀도넛","고로케"]},{"title":"기타","item":["버터오징어","쥐포","달고나","엿","기타"]}]);
  const [selectCategory, setSelectCategory] = useState(0);
  const [tagList, setTagList] = useState([]);
  const [selectTag, setSelectTag] = useState([]);

  // 모달
  const { isShowing, title, contents, setModal} = ModalUtil();
  

  useEffect(() => {
    if(selectCategory){
      setTagList(categoryList[selectCategory-1].item)
      setSelectTag([])
    }
  },[categoryList,selectCategory]);


  return (
    <div className="settingCategory modalPage">
      <ModalHeader goBack={history.goBack} title={'카테고리 설정'}/>
      <div className="settingInfoBox">
        <h2 className="settingInfoTitle">판매하는 음식을 선택하세요</h2>
        <p className="settingInfo">카테고리는 <b>1개</b>, 대표메뉴는 <b>최대 3개</b>까지<br/>선택가능</p>
      </div>
      <RadioCategory 
        fullMode={false} 
        title={'카테고리 선택'} 
        item={categoryList} 
        selectCategory={selectCategory} 
        setSelectCategory={setSelectCategory}
      />
      {selectCategory?
        <InputTag 
          fullMode={false} 
          title={'대표메뉴 선택'} 
          item={tagList}
          selectTag={selectTag}
          setSelectTag={setSelectTag}
          setModal={setModal}
        />
      :null }
      <Modal isShowing={isShowing} hide={setModal} title={title} contents={contents}/>
    </div>
  );
};

export default withRouter(SettingCategory);
