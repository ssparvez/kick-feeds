import React from 'react'
import Modal from './Modal';
import history from '../../history';
import EmailSentImage from '../../assets/undraw_mail_box_kd5i.svg';

export const SignUpEmailSent = () => {
  return (
    <Modal id="signup-email-sent" style={{textAlign: 'center'}} onDismiss={() => history.push('/')}>
      <div className="header">Email Sent!</div>
      <div className="content">
        <img src={EmailSentImage} width="300px" alt="email has been sent" style={{padding: '0px 64px'}} />
      </div>
      <div className="actions">
        <button type="submit" onClick={() => history.push('/')} className="filled blue send">Got it</button>
      </div>

    </Modal>
  )
}