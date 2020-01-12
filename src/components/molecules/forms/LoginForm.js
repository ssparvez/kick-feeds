import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import './LoginForm.scss';

class LoginForm extends Component {
  // supposed to return input element
  // reduxform gives form props
  renderInput = ({ input, label, icon, type }) => { // label is passed as prop below
    return (
      <div className="field">
        <i className="material-icons">{icon}</i>
        <input {...input} autoComplete="off" placeholder={label} type={type}/>
      </div>
    ); // same as below, adds all props to input
  }

  onSubmit = (formValues) => {
    console.log(this);
    console.log(formValues)
    console.log('subnitting form');
    this.props.onSubmit(formValues);
  }

  render() {
    // name prop is always required
    //props.handleSubmit comes from redux form
    return (
      <form className="login-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div id="banner">Jotter</div>
        <div className="description">The place to gather your thoughts</div>
        <Field name="email" component={this.renderInput} label="Email" icon="email" type="email" />
        <Field name="password" component={this.renderInput} label="Password" icon="vpn_key" type="password" />
        <button className="filled blue">
          <i className="material-icons">exit_to_app</i>
          <span className="text">Sign In</span>
        </button>
      </form>
    )
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    // only runs if user did not enter email
    errors.email = 'You must enter a email'; // prop must match name prop on field tag
  }

  if (!formValues.password) {
    // only runs if user did not enter title
    errors.password = 'You must enter a password';
  }

  console.log('we got errors');

  return errors;
};

// have to combine connect function somehow
export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm);