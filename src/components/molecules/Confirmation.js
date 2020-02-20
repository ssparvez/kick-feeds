import React, { Component } from 'react';
import Modal from './Modal';
import history from '../../history';
import emailConfirmedImage from '../../assets/undraw_Mail_sent_qwwx.svg';
import emailNotConfirmedImage from '../../assets/undraw_not_found_60pq.svg';
import { connect } from 'react-redux';
import { confirmUser } from '../../actions';
import Loader from '../atoms/Loader';
import './Confirmation.scss';

class Confirmation extends Component {

  componentDidMount() {
    // grab token from url
    console.log(this.props.match.params.token)
    this.props.confirmUser(this.props.match.params.token);
  }

  render() {
    if (this.props.isVerifying) {
      return <Loader />
    } else { // need to add a flag for when response says user is already verified
      let title = this.props.userWasVerified ? 'Email Successfully Verified!' : 'Could not verify email';
      let image = this.props.userWasVerified ? emailConfirmedImage : emailNotConfirmedImage;
      let message = this.props.userWasVerified ? "You can now login to begin jotting!" : "Your access was not verified. You can try to resend a confirmation link."
      return (
        <Modal id="email-confirmation" style={{textAlign: 'center'}} onDismiss={() => history.push('/')}>
            <div className="header">{title}</div>
            <div className="content">
              <img src={image} width="300px" alt="confirmation result" style={{padding: '0px 64px'}} />
              <div className="message">{message}</div>
            </div>
            <div className="actions">
              <div className="resend" onClick={() => history.push('/')}>Resend confirmation link</div>

              <button type="submit" onClick={() => history.push('/')} className="filled blue send">Got it</button>
            </div>
          </Modal>
      );
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isVerifying: state.auth.isVerifying,
    userWasVerified: state.auth.userWasVerified,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }; // convert object back to an arra
}

export default connect(mapStateToProps, { confirmUser })(Confirmation);