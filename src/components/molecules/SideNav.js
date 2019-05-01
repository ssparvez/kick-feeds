import React, { Component } from 'react';
import './SideNav.scss';
import { NavLink } from 'react-router-dom';

export default class SideNav extends Component {
	render() {
		return (
			<div className="side-nav">
				<NavLink to="/" className="item" activeClassName="active" exact>
					<i className="material-icons">home</i>
					<span className="label">Home</span>
				</NavLink>
				<NavLink to="/matches/live" className="item" activeClassName="active">
					<i className="material-icons">radio_button_checked</i>
					<span className="label">On Now</span>
				</NavLink>
				<NavLink to="/following" className="item" activeClassName="active">
					<i className="material-icons">star</i>
					<span className="label">Following</span>
				</NavLink>
				<NavLink to="/browse" className="item" activeClassName="active">
					<i className="material-icons">public</i>
					<span className="label">Browse</span>
				</NavLink>
			</div>
		)
	}
}
