import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import Landing from './pages/Landing.js';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { signInWithToken } from '../actions';
import Wall from './pages/Wall';
import Tags from './pages/Tag';
import PageNotFound from './pages/errors/PageNotFound';

class App extends Component {

  componentWillMount() {
    console.log('shello')
    // // if token is in cache, auto sign in
    let token = localStorage.getItem('token');
    if (token) { // and if not expired?
      let decoded = jwtDecode(token);
      this.props.signInWithToken(decoded.userId)
    }
  }

  componentDidMount() {

  }


  render() {
    // switch makes sure to match first one only
    return (
      <Fragment>
        <Switch>
          <Route path={["/", "/signup"]} exact component={Landing}/>
          <Route path="/wall" exact component={Wall} />
          <Route path="/tags" exact component={Tags} />
          <Route component={PageNotFound} />
        </Switch>
      </Fragment>
    )

  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }; // convert object back to an arra
}
export default connect(mapStateToProps, { signInWithToken })(App);