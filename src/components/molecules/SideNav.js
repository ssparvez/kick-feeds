import React, { Component } from 'react';
import './SideNav.scss';
import { NavLink } from 'react-router-dom';

export default class SideNav extends Component {
  render() {
    return (
      <div id="side-nav">
				<NavLink to="/wall" className="item" activeClassName="active" exact>
					<i className="material-icons">receipt</i>
					<span className="label">Wall</span>
				</NavLink>
				<NavLink to="/tags" className="item" activeClassName="active">
					<i className="material-icons">label</i>
					<span className="label">Tags</span>
				</NavLink>
			</div>
    )
  }
}