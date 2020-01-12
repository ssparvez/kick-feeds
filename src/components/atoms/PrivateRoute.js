import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    console.log('is logge', this.props.isSignedIn);
    return this.props.isSignedIn ?
      <Route { ...this.props } /> :
      <Redirect to="/" />
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  }; // convert object back to an arra
}
export default connect(mapStateToProps, null, null, {
  pure: false,
})(PrivateRoute);