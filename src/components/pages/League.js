import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCompetitionAndStandings } from '../../actions';
import Loader from '../atoms/Loader';
import './League.scss';
import MatchCard from '../atoms/MatchCard';
import Skeleton from 'react-loading-skeleton';

class League extends Component {
  componentDidMount() {
		// grab league id from url path
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
	}

	renderMatches() {
		const currentDate = new Date();
		currentDate.setHours(0,0,0,0);
		const todaysDate = currentDate.getTime();
		
		// filter today's matches
		// const matches = this.props.matches.filter(({event_date}) => {
		// 	const matchDate = new Date(event_date);
		// 	matchDate.setHours(0,0,0,0);
		// 	return currentDate.getTime() === matchDate.getTime();
		// });

		const matchDays = this.getMatchDays();

		const lastDate = new Date(this.props.competition.season_end);
		lastDate.setHours(0,0,0,0);
		// console.log(lastDate.getTime());bba
		while (currentDate.getTime() !== lastDate.getTime()) {
			currentDate.setDate(currentDate.getDate() + 1);
			if (matchDays[currentDate.getTime()]) {
				const content = matchDays[currentDate.getTime()].map(match => {
					return (
						<MatchCard match={match} teams={this.props.teams} key={match.fixture_id} />
					);
				});

				let gameDate;
				console.log(currentDate.getTime)
				if (currentDate.getTime() === todaysDate) {
					gameDate = 'Today';
				}
				else {
					const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
					gameDate = 'Upcoming - ' + currentDate.toLocaleDateString("en-US", options);
				}

				return (
					<div className="yooo">
						<div style={{color: 'rgba(0,0,0,0.6)', fontSize: '12px', marginBottom: '8px' }}>{gameDate}</div>
						{content}
					</div>	
				)
			}
		}

		// return matches.map(({fixture_id, homeTeam, awayTeam}) => {
		// 	return (
		// 		<Link to={`/matches/${fixture_id}`} key={fixture_id}>{homeTeam} vs. {awayTeam}</Link>
		// 	);
		// });
	}

	getMatchDays() {
		const matchDays = {};
		this.props.matches.forEach(match => {
			const matchDate = new Date(match.event_date);
			matchDate.setHours(0,0,0,0);
			if (matchDays[matchDate.getTime()]) {
				matchDays[matchDate.getTime()].push(match);
			}
			else {
				matchDays[matchDate.getTime()] = [match];
			}
		});
		return matchDays;
	}

  render() {
		if (this.props.competition) {
			return (
				<div className="league">
					{/* <img src={this.props.competition.logo} alt="yo" /> */}
					<h1>{this.props.competition.name || <Skeleton />}</h1>
					<div className="container">
						<div className="matches">
							<h3>Matches</h3>
							{this.renderMatches()}
						</div>
						<div className="standings">
							<h3>Standings</h3>
							{this.renderStandingsHeading()}
							{this.renderStandings()}
						</div>					
					</div>
				</div>
			);
		}
		else {
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

export default connect(mapStateToProps, { fetchCompetitionAndStandings })(League);