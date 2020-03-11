import React from 'react';
import './style.scss';


const Button = ({fullmode=false , active=true, onEvent}) => {

  return (
    <div 
      className={`button ${(fullmode)?'fullMode':''} ${(active)?'active':''}`}
      onClick={()=> active?onEvent():null}
    >
      버튼
    </div>
  )
};

export default Button;
