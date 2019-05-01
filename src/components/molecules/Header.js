import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import GoogleAuth from '../atoms/GoogleAuth.js';
import SearchBar from '../atoms/SearchBar.js';

const Header = () => {
  return (
    <div className="header">
			<div>
				<Link to="/" className="logo">KickFeeds</Link>
				<div className="description">The place to chat about the beautiful game.</div>
			</div>
			
			<div className="menu">
				<SearchBar />
				<GoogleAuth />
			</div>
    </div>
  )
}

export default Header;