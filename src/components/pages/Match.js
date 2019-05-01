import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMatch } from '../../actions';
import Loader from '../atoms/Loader';

class Match extends Component {
  componentDidMount() {
		// grab league id from url path
		const { id } = this.props.match.params;

		this.props.fetchMatch(id);
	}

  render() {
		console.log(this.props.fixture);
		const { homeTeam, awayTeam} = this.props.fixture;
		return <div>{homeTeam} vs {awayTeam}</div>
  }
}

const mapStateToProps = (state) => {
  return {

		fixture: state.football.match,
		// standings: Object.values(state.football.standings),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }; // convert object back to an arraY
}

export default connect(mapStateToProps, { fetchMatch })(Match);