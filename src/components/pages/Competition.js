import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCompetitionAndStandings } from '../../actions';
import Loader from '../atoms/Loader';
import './Competition.scss';
import MatchCard from '../atoms/MatchCard';
import Skeleton from 'react-loading-skeleton';

class Competition extends Component {
  componentDidMount() {
    // grab competition id from url path
    const { id } = this.props.match.params;

    this.props.fetchCompetitionAndStandings(id);
  }


  renderStandingsHeading() { // literal dupe of renderStandings()
    return (
      <div className="standing heading">
				<div className="team">
					<div className="position"></div>
					<div className="name">Team</div>
				</div>
				
				<div className="metrics">
					<div className="matches-played">P</div>
					<div className="goal-difference">GD</div>
					<div className="points">Pts</div>
				</div>
			</div>
    );
  }

  renderStandings() {
    if (this.props.standings.length > 0) {
      return this.props.standings.map(standing => {
        const { team_id, rank, teamName, matchsPlayed, goalsDiff, points } = standing;
        return (
          <Link to={`/teams/${team_id}`} key={team_id} className="standing">
						<div className="team">
							<div className="position">{rank}.</div>
							<div className="name">{teamName}</div>
						</div>
						
						<div className="metrics">
							<div className="matches-played">{matchsPlayed}</div>
							<div className="goal-difference">{goalsDiff}</div>
							<div className="points">{points}</div>
						</div>
					</Link>
        )
      });
    } else {
      return <Skeleton height={400} />
    }
  }

  renderUpcomingMatches(currentDate, matchDays) {
    if (this.props.matches.length > 0) {
      const todaysDate = currentDate;
      const lastDate = new Date(this.props.competition.season_end).setHours(0, 0, 0, 0);
      console.log(lastDate);

      for (; currentDate <= lastDate; currentDate += 86400) {
        if (matchDays[currentDate]) {
          let matchDate = 'Today';
          if (currentDate !== todaysDate) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            matchDate = 'Upcoming - ' + new Date(currentDate).toLocaleDateString("en-US", options);
          }
          return this.renderMatchCards(matchDate, matchDays[currentDate]);
        }
      }
    } else {
      return <Skeleton height={100}/>;
    }
  }

  renderPastMatches(currentDate, matchDays) {
    if (this.props.matches.length > 0) {
      const firstDate = new Date(this.props.competition.season_start).setHours(0, 0, 0, 0);
      console.log(matchDays);
      for (; currentDate > firstDate; currentDate -= 86400) {
        if (matchDays[currentDate]) {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const matchDate = 'Past - ' + new Date(currentDate).toLocaleDateString("en-US", options);
          return this.renderMatchCards(matchDate, matchDays[currentDate]);
        }
      }
    } else {
      return <Skeleton height={100}/>;
    }
  }

  renderMatchCards(matchDate, matchDayGames) {
    const matchCards = matchDayGames.map(match =>
      <MatchCard match={match} teams={this.props.teams} key={match.fixture_id} />
    );

    return (
      <div className="past-matches">
				<div className="date">{matchDate}</div>
				<div className="cards">{matchCards}</div>
			</div>
    );
  }

  getMatchDays() {
    const matchDays = {};
    this.props.matches.forEach(match => {
      const matchDate = new Date(match.event_date).setHours(0, 0, 0, 0);
      matchDays[matchDate] = [...matchDays[matchDate] || [], match];
    });
    return matchDays;
  }

  render() {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const matchDays = this.getMatchDays();

    if (this.props.competition) {
      return (
        <div className="competition">
					{/* <img src={this.props.competition.logo} alt="yo" /> */}
					<h1 className="name">{this.props.competition.name}</h1>
					<div className="matches">
						<h3>Matches</h3>
						{this.renderUpcomingMatches(currentDate, matchDays)}
						{this.renderPastMatches(currentDate - 86400, matchDays)}
					</div>
					<div className="news">
						<h3>News</h3>
					</div>
					<div className="standings">
						<h3>Standings</h3>
						{this.renderStandingsHeading()}
						{this.renderStandings()}
					</div>
				</div>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    teams: Object.values(state.football.teams),
    matches: Object.values(state.football.matches),
    competition: state.football.competition,
    standings: Object.values(state.football.standings),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }; // convert object back to an arra
}

export default connect(mapStateToProps, { fetchCompetitionAndStandings })(Competition);