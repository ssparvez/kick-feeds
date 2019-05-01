import React, { Component } from 'react';
import './SearchBar.scss';

export default class SearchBar extends Component {
	render() {
		return (
			<div className="search-bar">
					<i className="material-icons">search</i>
					<input placeholder="Find competitions and teams" />
			</div>
		)
	}
}
