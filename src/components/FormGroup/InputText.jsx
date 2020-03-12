import React from 'react';
import './style.scss';

const InputText = ({label='',type='text',onEvent=null ,selcetData=null}) => {

  const renderInput = ()=>{
    switch (type) {
      case 'openModal':
        return (
          <div 
            className={`inputText ${selcetData?.sub?'selcet':''}`}
            onClick={onEvent}
          >
            <p>{selcetData?.main?selcetData.main:'선택해주세요'}</p>
            {selcetData?<span>{selcetData.sub}</span>:null}
          </div>
        )
      case 'textarea':
        return  <textarea className="inputText" placeholder='입력해주세요'></textarea>
      default:
        return <input className="inputText" defaultValue='' type={type} placeholder='입력해주세요'/>
    }
  }

  return (
    <div className='inputTextItem'>
      <label>{label}</label>
      {renderInput()}
    </div>
  )
};

export default InputText;
