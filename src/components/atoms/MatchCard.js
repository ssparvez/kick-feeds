import React from 'react';
import { Link } from 'react-router-dom';
import './MatchCard.scss';

const MatchCard = (props) => {
	const { fixture_id, homeTeam, homeTeam_id, awayTeam, awayTeam_id, status, goalsAwayTeam, goalsHomeTeam, event_date } = props.match;
	let homeTeamLogo = null, awayTeamLogo = null;
	props.teams.forEach(({team_id, logo}) => {
		if (team_id === homeTeam_id) homeTeamLogo = logo;
		if (team_id === awayTeam_id) awayTeamLogo = logo;
	})
	console.log(props.match);
	console.log(props.teams);

	let score, time;
	if (status === 'Not Started') {
		score = 'V';
		const eventDate = new Date(event_date);
		const meridiem = eventDate.getHours() >= 12 ? "pm" : "am";
		time = (eventDate.getHours() - 12) + meridiem;
	}
	else {
		score = `${goalsHomeTeam} - ${goalsAwayTeam}`
		time = 'LIVE';
	}

	// add time under match

	return (
			<Link to={`/matches/${fixture_id}`} className="match-card">
				<div className="overview">
					<div className="team home">
						<img src={homeTeamLogo} alt={homeTeam}/>
						<div className="name">{homeTeam}</div>
					</div>
					<div className="score">{score}</div>
					<div className="team away">
						<img src={awayTeamLogo} alt={awayTeam}/>
						<div className="name">{awayTeam}</div>
					</div>
				</div>
				<div className="time">{time}</div>
			</Link>
	)
}

export default MatchCard;
