import React, { Component } from 'react';
import './WelcomeBox.scss';

export default class WelcomeBox extends Component {
  render() {
    return (
      <div className="welcome-box">
				<h1>Welcome to Jotter!</h1>
				<h3>[insert cool graphic above]This is the beginning of your history. You can start jotting something down below.</h3>
			</div>
    )
  }
}