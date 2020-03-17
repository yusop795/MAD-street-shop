import React, { useState, useRef } from 'react';
import { FormGroup } from '../FormGroup'
import windowUtil from '../../util/windowUtil'
import './style.scss';

const ImgUploader = ({fullMode = false, title = '', info='', multiple = true}) => {
  const [isImgUpload, setIsImgUpload] = useState(true);
  const [imgFiles, setImgFiles] = useState([]);
  const imgUploader = useRef();

  const fileReader = (target) => {
    return [...target.files].map((files,i) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = ({currentTarget}) => {
          const base64 = currentTarget.result;
          resolve(base64.toString())
        };
        reader.onerror = (e) => {
          reject(e)
        }
        reader.readAsDataURL(files);
      });
    })
  }

  const onChangeImg = ({target}) => {
    const imgs = fileReader(target)
    Promise.all(imgs).then(v => { 
      if(v.length > 0){
        setImgFiles([...imgFiles,{imgFile:target.files[0],imgBase64:v}])
        if(!multiple) setIsImgUpload(false)
      }
    });
  }

  const deleteImg = (index) => {
    if(!isImgUpload){
      setImgFiles([])
      setIsImgUpload(true)
    } else {
      const img = imgFiles.filter((v,i) => index!== i)
      setImgFiles(img)
    }

  }

  const renderImgPreviewBox = () => {
    return imgFiles.map((v,i)=>{
      return (
        <div className='imgPreview imgBox' key={`imgPreview-${i}`} style={{backgroundImage:`url(${v.imgBase64})`}}>
          <span className="imgDelBtn" onClick={()=>deleteImg(i)}/>
        </div>
      )
    })
  }


  
  return (
    <FormGroup fullMode={fullMode} title={title} subTittle={(multiple?`${imgFiles.length}/10`:null)} info={info}> 
      <div className="imgUploaderBox"> 
        {isImgUpload? (
          <div className="imgUploader imgBox" onClick={() => imgUploader.current.click()}>
            <input type="file" name="ImgUpload" ref={imgUploader} onChange={onChangeImg} accept="image/*" hidden={true} />
          </div>
        ):(
          <div className='imgPreview imgBox' style={{backgroundImage:`url(${imgFiles[0].imgBase64})`}}>
            <span className="imgDelBtn" onClick={deleteImg}/>
          </div>
        )}

        {multiple ? (
          <div className="imgPreviewBox" style={{width:`${windowUtil.useWindowSize().width - 132}px`}}>
          <div>
            {renderImgPreviewBox()}
          </div>
        </div>
        ):null}
      </div>
    </FormGroup>
  )
};

export default ImgUploader;
