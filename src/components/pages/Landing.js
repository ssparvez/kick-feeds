import React, { Component } from 'react'
import './Landing.scss';

import LoginForm from '../molecules/forms/LoginForm';
import landingImage from '../../assets/undraw_absorbed_in_xahs.svg';
import { Link, Route } from 'react-router-dom';
import { SignUp } from '../molecules/SignUp';
import Confirmation from '../molecules/Confirmation.js';

class Landing extends Component {

  render() {
    return (
      <div id="landing">
        <img src={landingImage} alt="welcome to jotter" />
        <div className="entry">
          <LoginForm />
          <Link to="signup?email-sent=false" className="signup-action">Don't have an account? Sign up.</Link>
        </div>

        <Route path="/signup" component={SignUp} />
        <Route path="/confirmation/:token" component={Confirmation} />
		  </div>
    )
  }
}

export default Landing;