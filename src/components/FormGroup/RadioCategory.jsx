import React from 'react';
import {FormGroup} from '../FormGroup'
import iconBAgreementOn from '../../assets/imgs/iconBAgreementOn.png';
import './style.scss';

const style = {
  width:24,
  height:24,
  border:'1px solid rgba(220,220,220,1)',
  borderRadius:'50%',
}

const RadioCategory = ({fullMode = false, title = '', item = [], selectCategory, setSelectCategory}) => {
  return (
    <FormGroup fullMode={fullMode} title={title}>
      {item.map((v,i)=>(
        <li className={`radioCategoryItem ${(selectCategory === i+1)?'select':''}`} key={v.title}>
          <label htmlFor={`categoryTitle-${i+1}`} className="radioInput">
            <input 
              type="radio"
              id={`categoryTitle-${i+1}`} 
              name="title" 
              value={v.title} 
              checked={(selectCategory === i+1)?true:false}
              hidden={true} 
              onChange={()=> setSelectCategory(i+1)}
            />
            {(selectCategory === i+1)?<img src={iconBAgreementOn} alt='선택버튼'/>:<div style={style}></div>}
            <span>{v.title}</span>
          </label>
        </li>
      ))}
    </FormGroup>
  )
};

export default RadioCategory;
