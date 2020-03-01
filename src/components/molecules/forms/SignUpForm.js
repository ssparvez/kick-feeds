import React, { Fragment, Component } from 'react';
import Modal from '../Modal';
import history from '../../../history';
import './SignUpForm.scss';
import { Formik, Form, Field } from 'formik';
import { withToast } from 'react-awesome-toasts';
import { connect } from 'react-redux';
import { signUp } from '../../../actions';

class SignUpForm extends Component {
  componentDidMount() {
    // this.props.fetchStream(this.props.match.params.id);
  }
  renderActions(isSubmitting) {
    return (
      <Fragment>
        <div className="cancel" onClick={() => history.push('/')}>Cancel</div>
        <button type="submit" disabled={isSubmitting} className="filled blue send">Send Email</button>
      </Fragment>
    );
  }

  onSubmit = ({ email, password }, { setSubmitting }) => {
    setTimeout(() => {
      this.props.signUp({ email, password });
      setSubmitting(false);
    }, 400);
  }

  toastErrors(errors) {
    const toastProps = {
      actionText: 'Ok',
      ariaLabel: 'An error occurred while logging in, click to acknowledge',
      onActionClick: this.props.toast.hide,
    };
    let text;
    if (Object.keys(errors).length > 1) {
      text = "An email and password is required"
    } else {
      text = Object.values(errors)[0];
    }

    toastProps.text = text;

    this.props.toast.show(toastProps);
  }

  renderContent() {
    return (
      <Fragment>
        <div className="message">
          Enter the details that you'd like to setup an account with. We'll send a verification email just to make sure it's you.
        </div>

        <Field name="email" type="email" placeholder="Enter an email" />
        <Field name="password" type="password" placeholder="Enter a password" />
        <Field name="confirm_password" type="password" placeholder="Confirm your password" />
      </Fragment>
    );
  }

  render() {
    return (
      <Modal id="signup-form" onDismiss={() => history.push('/')}>

        <Formik initialValues={{email: '', password: '', confirm_password: ''}} onSubmit={this.onSubmit} validate={this.validate} validateOnChange={false} validateOnBlur={false}>
          {({ isSubmitting }) => (
            <Form>
              <div className="header">Create an account</div>
              <div className="content">{this.renderContent()}</div>
              <div className="actions">{this.renderActions(isSubmitting)}</div>
            </Form>
          )}
        </Formik>
      </Modal>
    )
  }

  validate = formValues => {
    const errors = {};

    if (!formValues.email) {
      // only runs if user did not enter email
      errors.email = 'An email is required'; // prop must match name prop on field tag
    }

    if (!formValues.password) {
      // only runs if user did not enter title
      errors.password = 'A password is required';
    }

    if (formValues.password !== formValues.confirm_password) {
      // only runs if user did not enter title
      errors.password_mismatch = 'Passwords must match';
    }

    if (Object.keys(errors).length > 0) {
      this.toastErrors(errors);
    }

    return errors;
  };

}

const mapStateToProps = (state) => {
  return {
    notes: state.jotter.notes,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  }; // convert object back to an arra
}

export default connect(mapStateToProps, { signUp })(withToast(SignUpForm));