import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = (props) => {
  return (
    <div id="header">
			<div>
				<Link to="/" className="logo">Jotter</Link>
				<div className="description">The place to gather your thoughts</div>
			</div>
			
			<div className="menu">
				{/* <GoogleAuth /> */}
        <button className="outlined red" onClick={props.signOut}>
          <i className="material-icons" style={ { transform: 'rotate(180deg)'}}>logout</i>
          <span className="text">Sign Out</span>
        </button>
			</div>
    </div>
  )
}

export default Header;