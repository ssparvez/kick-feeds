import React from 'react';
import './EmptyState.scss';
import { Link } from 'react-router-dom';

const EmptyState = (props) => {

  return (
    <div className="empty-state">
      <img className="image" src={props.image} alt="no notes" height="400" />
      <div className="label">
        <div>{props.label}</div>

        {props.redirect && (<div>Go <Link to={props.redirect[1]}>{props.redirect[0]}</Link></div>)}
      </div>
    </div>
  )
}

export default EmptyState;