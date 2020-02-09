import React, { Component } from 'react';
import './LoginForm.scss';
import { Formik, Field, Form } from 'formik';
import { withToast } from 'react-awesome-toasts';
import { connect } from 'react-redux';
import { signInWithEmail } from '../../../actions';


class LoginForm extends Component {
  // supposed to return input element
  // reduxform gives form props
  renderInput = ({ field, label, icon, type }) => { // label is passed as prop below
    return (
      <div className="field">
        <i className="material-icons">{icon}</i>
        <input {...field} autoComplete="off" placeholder={label} type={type}/>
      </div>
    ); // same as below, adds all props to input
  }

  onSubmit = (formValues, { setSubmitting }) => {
    setTimeout(() => {
      // this.props.onSubmit(formValues);
      this.props.signInWithEmail(formValues);

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

  render() {
    // name prop is always required
    //props.handleSubmit comes from redux form
    return (
      <Formik initialValues={{email: '', password: ''}} onSubmit={this.onSubmit} validate={this.validate} validateOnChange={false} validateOnBlur={false}>
        
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div id="banner">Jotter</div>
            <div className="description">The place to gather your thoughts</div>
            <Field name="email" label="Email" type="email" icon="email" component={this.renderInput} />
            <Field name="password" label="Password" type="password" icon="vpn_key" component={this.renderInput} />
            <button type="submit" className="filled blue" disabled={isSubmitting}>
              <i className="material-icons">exit_to_app</i>
              <span className="text">Sign In</span>
            </button>
          </Form>
        )}
      </Formik>
    )
  }

  validate = formValues => {
    console.log('VALIDATING');
    const errors = {};

    if (!formValues.email) {
      // only runs if user did not enter email
      errors.email = 'An email is required'; // prop must match name prop on field tag
    }

    if (!formValues.password) {
      // only runs if user did not enter title
      errors.password = 'A password is required';
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

export default connect(mapStateToProps, { signInWithEmail })(withToast(LoginForm));