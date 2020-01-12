import React, { Component } from 'react'
import './Landing.scss';

import { connect } from 'react-redux';
import { signInWithEmail } from '../../actions';
import LoginForm from '../molecules/forms/LoginForm';
import landingImage from '../../assets/undraw_absorbed_in_xahs.svg';
import { Link, Route } from 'react-router-dom';
import SignUpForm from '../molecules/forms/SignUpForm';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSignUp: false,
    };
  }

  render() {
    return (
      <div id="landing">
        <img src={landingImage} alt="welcome to jotter" />
        <div>
          <LoginForm onSubmit={this.onSubmit} />
          <Link to="signup" className="signup-action" onClick={this.onButtonClick}>Don't have an account? Sign up.</Link>
        </div>

        <Route path="/signup" component={SignUpForm} />

        {/* <GoogleAuth /> */}
		  </div>
    )
  }

  onSubmit = (formValues) => {
    console.log(this.props)
    this.props.signInWithEmail(formValues);
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.jotter.notes,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  }; // convert object back to an arra
}

export default connect(mapStateToProps, { signInWithEmail })(Landing);