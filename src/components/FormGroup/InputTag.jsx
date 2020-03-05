import React from 'react';
import {FormGroup} from '../FormGroup'
import './style.scss';

const InputTag = ({fullMode = false, title = '', item = [], selectTag=[], setSelectTag}) => {

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
              onChange={()=> setSelectTag([...selectTag,v])}
            />
            <span>{v}</span>
          </label>
        </li>
      ))}
    </FormGroup>
  )
};

export default InputTag;
