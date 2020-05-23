import React from 'react';
import './style.scss';


const IconBox = ({ iconList = [] }) => {

  return (
    <div className="iconBox">
      <span role="img" aria-label="1">🍢</span>
      <span role="img" aria-label="2">🥪</span>
      <span role="img" aria-label="3">🍩</span>
      <span role="img" aria-label="4">🍤</span>
    </div>
  )
};

export default IconBox;
