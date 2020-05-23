import React, { useState, useRef, useEffect } from 'react';
import { FormGroup } from '../FormGroup'
import windowUtil from '../../util/windowUtil'
import './style.scss';

const ImgUploader = ({ fullMode = false, title = '', info = '', multiple = true, setFiles = null, files }) => {
  const [isImgUpload, setIsImgUpload] = useState(files.length > 0 ? false : true);
  const [imgFiles, setImgFiles] = useState(files);
  const imgUploader = useRef();

  const fileReader = (target) => {
    return [...target.files].map((files, i) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = ({ currentTarget }) => {
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

  const onChangeImg = ({ target }) => {
    const imgs = fileReader(target)
    Promise.all(imgs).then(v => {
      if (v.length > 0) {
        setImgFiles([...imgFiles, v[0]])
        if (!multiple) setIsImgUpload(false)
      }
    });
  }

  const deleteImg = (index) => {
    if (!multiple) {
      setImgFiles([])
      setIsImgUpload(true)
    } else {
      const img = imgFiles.filter((v, i) => index !== i)
      setImgFiles(img)
    }

  }

  useEffect(() => {
    if (imgFiles.length > 0) {
      setFiles(imgFiles)
    } else if (imgFiles.length > 10) {
      alert('이미지는 최대 10개만 업로드 가능합니다.')
    }
  }, [imgFiles]);



  const renderImgPreviewBox = () => {
    return imgFiles.map((v, i) => {
      return (
        <div className='imgPreview imgBox' key={`imgPreview-${i}`} style={{ backgroundImage: `url(${v})` }}>
          <span className="imgDelBtn" onClick={() => deleteImg(i)} />
        </div>
      )
    })
  }



  return (
    <FormGroup fullMode={fullMode} title={title} subTittle={(multiple ? `${imgFiles.length}/10` : null)} info={info}>
      <div className="imgUploaderBox">
        {!multiple && !isImgUpload ? (
          <div className='imgPreview imgBox' style={{ backgroundImage: `url(${imgFiles[0]})` }}>
            <span className="imgDelBtn" onClick={deleteImg} />
          </div>) : null}

        {!multiple && isImgUpload ? (
          <div className="imgUploader imgBox" onClick={() => imgUploader.current.click()}>
            <input type="file" name="ImgUpload" ref={imgUploader} onChange={onChangeImg} accept="image/*" hidden={true} />
          </div>
        ) : null}

        {multiple ? (
          <>
            <div className="imgUploader imgBox" onClick={() => imgUploader.current.click()}>
              <input type="file" name="ImgUpload" ref={imgUploader} onChange={onChangeImg} accept="image/*" hidden={true} />
            </div>
            <div className="imgPreviewBox" style={{ width: `${windowUtil.useWindowSize().width - 132}px` }}>
              <div>
                {renderImgPreviewBox()}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </FormGroup>
  )
};

export default ImgUploader;
