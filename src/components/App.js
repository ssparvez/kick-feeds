import React from 'react';
import { Router } from 'react-router-dom';
import Header from './molecules/Header.js';
import history from '../history';
import './App.scss';
import SideNav from './molecules/SideNav.js';
import Content from './molecules/Content.js';


const App = () => {
  // switch makes sure to match first one only
  return (
    <Router history={history}>
			<div className="app"> {/* is this div tag necessary */}
				<Header />
				<SideNav />
				<Content />
			</div>
		</Router>
  )
}

export default App;