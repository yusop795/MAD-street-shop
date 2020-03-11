import React from 'react';
import {FormGroup} from '../FormGroup'
import './style.scss';

const InputTag = ({fullMode = false, title = '', item = [], selectTag=[], setSelectTag, setModal}) => {

  const onChangeTag = (v)=>{


      if(!selectTag.includes(v)){
        if(selectTag.length > 2) {
          setModal({
            contents:'대표메뉴는 최대 3개까지만<br/> 선택할 수 있어요.'
          })
        }else {
          setSelectTag([...selectTag,v])
        }
      }else {
        selectTag.splice(selectTag.indexOf(v),1)
        setSelectTag([...selectTag])
      }

  }

  return (
    <FormGroup fullMode={fullMode} title={title}>
      {item.map((v,i)=>(
        <li 
          className={`inputTagItem ${(selectTag.includes(v))?'select':''}`} 
          key={v}
        >
          <label>
            <input 
              type="checkbox"
              name="item" 
              value={v.title} 
              hidden={true} 
              onChange={()=> onChangeTag(v) }
            />
            <span>{v}</span>
          </label>
        </li>
      ))}
    </FormGroup>
  )
};

export default InputTag;
