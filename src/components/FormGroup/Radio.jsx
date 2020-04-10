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

  return (
    <div className={`radioItem ${(selectItem === index)?'select':''}`}>
      <label htmlFor={`${type}Title-${index}`} className="radioInput">
        <input 
          type="radio"
          id={`${type}Title-${index}`} 
          name="title" 
          value={data?.title} 
          checked={(selectItem === index)?true:false}
          hidden={true} 
          onChange={()=> setSelectItem(index)}
        />
        {(selectItem === index)?<img src={iconBAgreementOn} alt='선택버튼'/>:<div style={style}></div>}
        {data.icon ? (
          <span dangerouslySetInnerHTML={{__html: `<b>${data?.icon}</b> ${data.title.replace('/','<br/>')}`}}></span>
        ) : (<span>{data?.title}</span>)}
      </label>
    </div>
  )
};

export default Radio;
