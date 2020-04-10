import React from 'react';
import iconChevronRight from '../../assets/imgs/iconChevronRight.png';
import './style.scss';

const InputText = ({label=null,type='text',onEvent=null ,selcetData=null, placeholder='입력해주세요',defaultValue=''}) => {

  const resizeTextArea = ({target}) => {
    target.style.height = "1px";
    target.style.height = `${target.scrollHeight}px`
  }

  const renderInput = ()=>{
    switch (type) {
      case 'openModal':
        return (
          <div 
            className={`inputText ${(selcetData?.sub)?'selcet':''}`}
            onClick={onEvent}
          >
            <p>
              {selcetData?.main?selcetData.main:'선택해주세요'}
              <img src={iconChevronRight} alt="right"/>
            </p>
            {selcetData?<span>{selcetData.sub}</span>:null}
          </div>
        )
      case 'textarea':
        return (
          <textarea 
            className="inputText" 
            onKeyDown={resizeTextArea} 
            placeholder={placeholder} 
            defaultValue={defaultValue}
            onChange={(e)=>(onEvent)?onEvent(e):null}
          >
          </textarea>
        )
      default:
        return (
          <input 
            className="inputText" 
            defaultValue={defaultValue} 
            type={type} 
            placeholder={placeholder} 
            onChange={(e)=>(onEvent)?onEvent(e):null}
          />
        )
    }
  }

  return (
    <div className='inputTextItem'>
      {label?<label>{label}</label>:null}
      {renderInput()}
    </div>
  )
};

export default InputText;
