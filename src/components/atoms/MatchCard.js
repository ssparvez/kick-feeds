import React from 'react';
import { Link } from 'react-router-dom';
import './MatchCard.scss';
import Skeleton from 'react-loading-skeleton';

const MatchCard = (props) => {
  const { fixture_id, homeTeam, homeTeam_id, awayTeam, awayTeam_id, statusShort, goalsAwayTeam, goalsHomeTeam, event_date } = props.match;
  let homeTeamLogo = null,
    awayTeamLogo = null;
  props.teams.forEach(({ team_id, logo }) => {
    if (team_id === homeTeam_id) homeTeamLogo = logo;
    if (team_id === awayTeam_id) awayTeamLogo = logo;
  })
  console.log(props.match);
  console.log(props.teams);

  let score, time;
  if (statusShort === 'NS') {
    score = 'V';
    const eventDate = new Date(event_date);
    const meridiem = eventDate.getHours() >= 12 ? "pm" : "am";
    time = (eventDate.getHours() - 12) + meridiem;
  } else if (statusShort === 'FT') {
    score = `${goalsHomeTeam} - ${goalsAwayTeam}`
    time = 'FT';
  } else {
    score = `${goalsHomeTeam} - ${goalsAwayTeam}`
    time = 'LIVE';
  }

  // add time under match
  return (
    <Link to={`/matches/${fixture_id}`} className="match-card" key={fixture_id}>
      {homeTeamLogo ? <img className="home logo" src={homeTeamLogo} alt={homeTeam}/> : <Skeleton circle={true} height={24} width={24} />}
      <div className="home name">{homeTeam}</div>
      <div className="score">{score}</div>
      {awayTeamLogo ? <img className="away logo" src={awayTeamLogo} alt={awayTeam}/> : <Skeleton circle={true} height={24} width={24} />}
      <div className="away name">{awayTeam}</div>
      <div className="time">{time}</div>
		</Link>
  )
}

export default MatchCard;