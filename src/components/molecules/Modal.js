import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = (props) => {

  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="mask">
      <div onClick={e => e.stopPropagation()} className="box" id={props.id}>
        <div className="header">{props.title}</div>
        <div className="content">
          {props.content}
        </div>
        <div className="actions">
          {props.actions}
        </div>
      </div> 
    </div>,
    document.getElementById('modal')
  );
}

export default Modal;