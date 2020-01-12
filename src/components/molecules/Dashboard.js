import React, { Component } from 'react';
import Header from './Header';
import SideNav from './SideNav.js';
import './Dashboard.scss';


import { connect } from 'react-redux';
import { signOut } from '../../actions';

class Dashboard extends Component {
  onSignOut = () => {
    this.props.signOut();
  }

  render() {
    return (
      <div id="dashboard">
        <Header signOut={this.onSignOut} />
        <SideNav />
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.jotter.notes,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    error: state.error
  }; // convert object back to an arra
}

export default connect(mapStateToProps, { signOut })(Dashboard);