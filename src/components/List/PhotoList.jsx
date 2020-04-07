import React from 'react';
import './style.scss';

const PhotoList = ({ items = [], type = '', onEvent = null}) => {
  return (
    <div className="photoListBox">
      <div style={{width:`${102 * 5}px`}}>
        <div className='imgBox'>
          {/* style={{backgroundImage:`url(${imgFiles[0].imgBase64})` */}
        </div>
        <div className='imgBox'>
          {/* style={{backgroundImage:`url(${imgFiles[0].imgBase64})` */}
        </div>
        <div className='imgBox'>
          {/* style={{backgroundImage:`url(${imgFiles[0].imgBase64})` */}
        </div>
        <div className='imgBox'>
          {/* style={{backgroundImage:`url(${imgFiles[0].imgBase64})` */}
        </div>
        <div className='imgBox'>
          {/* style={{backgroundImage:`url(${imgFiles[0].imgBase64})` */}
        </div>

      </div>

    </div>
  );
};

export default PhotoList;
