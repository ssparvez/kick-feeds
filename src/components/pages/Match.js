import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMatch, fetchMatchTeams } from '../../actions';
import Loader from '../atoms/Loader';
import './Match.scss';
import Skeleton from 'react-loading-skeleton';

class Match extends Component {
  componentDidMount() {
    // grab competition id from url path
    const { id } = this.props.match.params;

    this.props.fetchMatch(id);
  }

  render() {
    console.log(this.props.fixture);
    const { homeTeam, awayTeam, homeTeamLogo, awayTeamLogo } = this.props.fixture;
    return (
      <div className="match-detail">
				<div className="score-card">
          <div className="home logo">
          {homeTeamLogo ? <img  src={homeTeamLogo} alt={homeTeam}/> : <Skeleton circle={true} height={100} width={100} />}
          </div>
          <div className="home name">{homeTeam}</div>
          {/* <div className="score">{score}</div> */}
          {awayTeamLogo ? <img className="away logo" src={awayTeamLogo} alt={awayTeam}/> : <Skeleton circle={true} height={100} width={100} />}
          <div className="away name">{awayTeam}</div>
          {/* <div className="time">{time}</div> */}
				</div>
        <div className="events">Event List</div>
			</div>
    );

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

export default connect(mapStateToProps, { fetchMatch, fetchMatchTeams })(Match);