import React from 'react';
import { Link } from 'react-router-dom';
import './CompetitionCard.scss';

const CompetitionCard = (props) => {
  const { league_id, name, logo } = props.competition;
  return (
    <Link className="competition-card" to={`competitions/${league_id}`}>
			<img src={logo} alt={name} />
			<span className="note">{name}</span>
		</Link>
  )
}

export default CompetitionCard;