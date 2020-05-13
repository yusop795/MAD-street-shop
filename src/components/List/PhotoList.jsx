import React from 'react';
import './style.scss';

const PhotoList = ({ items = [], type = '', onEvent = null }) => {
  return (
    <div className="photoListBox">
      <div style={{ width: `${102 * 5}px` }}>
        {items.map((v, i) => {
          return (
            <div className='imgBox' key={`imgBox-${i}`} style={{ backgroundImage: `url(${v})` }} />
          )
        })}
      </div>
    </div>
  );
};

export default PhotoList;
