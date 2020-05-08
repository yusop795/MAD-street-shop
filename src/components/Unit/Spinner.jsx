import React from 'react';
import { css } from "react-emotion";

const loading_spinner = css`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0;
  z-index: 100000;

  .loading_spinner_img {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left: -20px;
    z-index: 9998;
  }
  .loading_spinner_bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .4;
    z-index: 9997;
  }

  .bouncing-loader {
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;

    &__round {
      width: 12px;
      height: 12px;
      background-color: rgb( 255,203, 51);
      border-radius: 50%;

      &:not(:first-child) {
        margin-left: 10px;
      }

      animation: bounce_spinner 0.6s infinite alternate;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }

`;

// const Spinner = ({ id = "spinnerWrapper" }) => {
//     return (
//         <div id={id} className={`${loading_spinner} inline_spinner`}>
//             <div className="loading_spinner_img bouncing-loader">
//                 <div className="bouncing-loader__round"></div>
//                 <div className="bouncing-loader__round"></div>
//                 <div className="bouncing-loader__round"></div>
//             </div>
//             <div className="loading_spinner_bg"></div>
//         </div>
//     );
// }

const Spinner = ({ id = "spinnerWrapper" }) => {
    return (
        <div id={id} className={`${loading_spinner} inline_spinner`}>
            <div className="loading_spinner_img bouncing-loader">
                <div className="bouncing-loader__round"></div>
                <div className="bouncing-loader__round"></div>
                <div className="bouncing-loader__round"></div>
            </div>
        </div>
    );
}

export default Spinner;
