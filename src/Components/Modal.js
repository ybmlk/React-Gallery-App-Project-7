import React from 'react';
import { ReactComponent as Xmark } from '../img/x-mark.svg';
import { ReactComponent as Left } from '../img/angle-left.svg';
import { ReactComponent as Right } from '../img/angle-right.svg';

const Modal = ({ src, next, prev, close, closeBtn, modalId, photosLength }) => (
  <div className='modal-container' onClick={close} onKeyDown={e => console.log(e.keyCode)}>
    <div className='modal'>
      <Xmark className='modal-close-btn' onClick={closeBtn} />
      {modalId !== 0 ? <Left className='modal-left-btn' onClick={prev} /> : null}
      {modalId < photosLength - 1 ? <Right className='modal-right-btn' onClick={next} /> : null}
      <img className='modal-img' src={src} alt='' />
    </div>
  </div>
);

export default Modal;
