import React, { Component } from 'react';
import './Loader.scss';

export default class Loader extends Component {
	render() {
		return (
			<div className="gooey">
				<span className="dot"></span>
				<div className="dots">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		)
	}
}