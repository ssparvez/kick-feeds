import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = (props) => {

  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="mask">
      <div onClick={e => e.stopPropagation()} className="box" id={props.id}>
        {props.children}
      </div> 
    </div>,
    document.getElementById('modal')
  );
}

export default Modal;