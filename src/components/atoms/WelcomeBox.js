import React, { Component } from 'react';
import './WelcomeBox.scss';

export default class WelcomeBox extends Component {
	render() {
		return (
			<div className="welcome-box">
				<h1>Welcome to KickFeeds!</h1>
				<h3>The place to chat about the beautiful game.</h3>
			</div>
		)
	}
}
