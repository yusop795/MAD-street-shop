import React from 'react';
import './style.scss';


const Button = ({ fullmode = false, active = true, bottom = false, onEvent = null, text = '' }) => {
  return (
    <button
      className={`button ${(fullmode) ? 'fullMode' : ''} ${(active) ? 'active' : ''} ${(bottom) ? 'bottom' : ''}`}
      onClick={() => active ? onEvent() : null}
    >
      {text}
    </button>
  )
};

export const RoundButton = ({ onEvent = null, text = '' }) => {
  return (
    <button className="roundButton" onClick={onEvent}>
      {text}
    </button>
  )
}

export default Button;
