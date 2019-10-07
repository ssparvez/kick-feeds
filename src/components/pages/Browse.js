import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCountries, fetchCountriesAndCompetitions } from '../../actions';
import _ from 'lodash';
import './Browse.scss';
import Skeleton from 'react-loading-skeleton';
import CompetitionCard from '../atoms/CompetitionCard';

class Browse extends Component {
  componentDidMount() {
    this.props.fetchCountries();
    this.props.fetchCountriesAndCompetitions();
    // this.props.fetchCompetitions();
  }

  renderCompetitionList(competitions) {
    if (competitions) {
      const content = _.map(competitions, (competition) => {
        return (
          <CompetitionCard competition={competition} key={competition.league_id} />
        );
      });
      return <div className="competitions">{content}</div>
    } else {
      return <Skeleton height={80} />;
    }
  }

  renderCountryList() {
    return this.props.countries.map(({ name, code, competitions }) => {
      const imageSrc = `https://www.countryflags.io/${code}/flat/64.png`;
      return (
        <div className="country" key={code}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img src={imageSrc} alt="" style={{ width: '32px', height: '32px', marginRight: '8px' }} />
						<h3>{name}</h3>
					</div>
					{this.renderCompetitionList(competitions)}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="browse">
        <h1>Browse</h1>
				<div className="countries">
					{this.renderCountryList()}
				</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    countries: Object.values(state.football.countries),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }; // convert object back to an arra
}

export default connect(mapStateToProps, { fetchCountries, fetchCountriesAndCompetitions })(Browse);