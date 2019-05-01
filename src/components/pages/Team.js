import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTeam } from '../../actions';
import Loader from '../atoms/Loader';

class League extends Component {
  componentDidMount() {
		// grab league id from url path
		const { id } = this.props.match.params;

		this.props.fetchTeam(id);
	}

  render() {
		console.log(this.props.team);
		
		if (this.props.team) {
			const { name, logo } = this.props.team;
			return (
				<div className="team">
					{/* <img src={logo} alt="yo" style={{ width: '50px', display: 'inline-block' }}/> */}
					<h1>{name}</h1>
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
		team: state.football.team,
		// standings: Object.values(state.football.standings),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }; // convert object back to an arraY
}

export default connect(mapStateToProps, { fetchTeam })(League);