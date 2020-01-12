import React, { Fragment, Component } from 'react';
import Modal from '../Modal';
import history from '../../../history';
import './SignUpForm.scss';

// import { fetchStream, deleteStream } from '../../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
  componentDidMount() {
    // this.props.fetchStream(this.props.match.params.id);
  }
  renderActions() {
    return (
      <Fragment>
        <div className="cancel" onClick={() => history.push('/')}>Cancel</div>
        <button onClick={this.onSubmit} className="filled blue send">Send Email</button>
      </Fragment>
    );
  }

  onSubmit = () => {
    // this.props.deleteStream(this.props.match.params.id);
  };

  renderContent() {
    // if (!this.props.stream) {
    //   return 'Are you sure you want to delete this stream?'
    // }



    return (
      <Fragment>
        <div className="message">
          Enter an email address that you'd like to setup an account width. We'll send a verification email just to make sure it's you.
        </div>
        <input type="email" />
      </Fragment>
    );
  }

  render() {
    return (
      <Modal 
        title="Create an account" 
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
        id="signup-form"
      />
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return { stream: state.streams[ownProps.match.params.id] };
// }

export default SignUpForm;