import React from 'react';
import iconBAgreementOn from '../../assets/imgs/iconBAgreementOn.png';
import './style.scss';

const Radio = ({type= 'radio', index = 0, data, selectItem, setSelectItem}) => {

  const style = {
    width:24,
    height:24,
    border:'1px solid rgba(220,220,220,1)',
    borderRadius:'50%',
    background:'white'
  }

  const key = index+1;

  return (
    <div className={`radioItem ${(selectItem === key)?'select':''}`}>
      <label htmlFor={`${type}Title-${key}`} className="radioInput">
        <input 
          type="radio"
          id={`${type}Title-${key}`} 
          name="title" 
          value={data?.title} 
          checked={(selectItem === key)?true:false}
          hidden={true} 
          onChange={()=> setSelectItem(key)}
        />
        {(selectItem === key)?<img src={iconBAgreementOn} alt='선택버튼'/>:<div style={style}></div>}
        <span>{data?.title}</span>
      </label>
    </div>
  )
};

export default Radio;
