import React from 'react';
import './style.scss';


const Button = ({fullmode=false , active=true, bottom=false, onEvent = null, text=''}) => {

  return (
    <div 
      className={`button ${(fullmode)?'fullMode':''} ${(active)?'active':''} ${(bottom)?'bottom':''}`}
      onClick={()=> active?onEvent():null}
    >
      {text}
    </div>
  )
};

export default Button;
