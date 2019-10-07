import football from '../apis/football';
import kickfeeds from '../apis/kickfeeds';
import { SIGN_IN, SIGN_OUT, FETCH_COMPETITIONS, FETCH_COUNTRIES, FETCH_COMPETITION, FETCH_STANDINGS, FETCH_TEAM, FETCH_COMPETITION_MATCHES, FETCH_MATCH, FETCH_TEAMS } from './types';
import _ from 'lodash';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const fetchCountryCompetitions = (country, season = 2018) => async dispatch => {
  const response = await football.get(`/leagues/country/${country}/${season}`);

  // console.log(response.data.api.leagues);
  if (!_.isArray(response.data.api.leagues)) {
    dispatch({
      type: FETCH_COMPETITIONS, // FETCH_COMPETITIONS_FOR_COUNTRY
      payload: response.data.api.leagues
    });
  }
};

export const fetchCountries = () => async dispatch => {
  const response = await kickfeeds.get('/countries');

  console.log(response);
  dispatch({
    type: FETCH_COUNTRIES,
    payload: response.data.countries
  });
};

export const fetchCountriesAndCompetitions = () => async (dispatch, getState) => {
  await dispatch(fetchCountries());

  const countries = getState().football.countries;
  _.forOwn(countries, country => {
    dispatch(fetchCountryCompetitions(country.name))
  });
};

export const fetchCompetition = (leagueId) => async dispatch => {
  const response = await football.get(`/leagues/league/${leagueId}`);

  // console.log(response.data.api);

  dispatch({
    type: FETCH_COMPETITION,
    payload: response.data.api.leagues
  });
};

export const fetchStandings = (leagueId) => async (dispatch, getState) => {
  const response = await football.get(`/leagueTable/${leagueId}`);

  dispatch({
    type: FETCH_STANDINGS,
    payload: response.data.api.standings
  });
};

export const fetchCompetitionMatches = (leagueId) => async (dispatch, getState) => {
  const response = await football.get(`/fixtures/league/${leagueId}`);

  dispatch({
    type: FETCH_COMPETITION_MATCHES,
    payload: response.data.api.fixtures
  });
};

export const fetchCompetitionAndStandings = (leagueId) => async (dispatch, getState) => {
  await dispatch(fetchCompetition(leagueId));
  await dispatch(fetchStandings(leagueId));
  await dispatch(fetchCompetitionMatches(leagueId));
  await dispatch(fetchTeams(leagueId));
} // could just call each action from the component instead

export const fetchTeams = (leagueId) => async (dispatch, getState) => {
  const response = await football.get(`/teams/league/${leagueId}`);

  dispatch({
    type: FETCH_TEAMS,
    payload: response.data.api.teams
  });
}

export const fetchTeam = (teamId) => async dispatch => {
  const response = await football.get(`/teams/team/${teamId}`);

  console.log(response.data.api);

  dispatch({
    type: FETCH_TEAM,
    payload: response.data.api.teams
  });
};

export const fetchMatch = (fixtureId) => async dispatch => {
  const response = await football.get(`/fixtures/id/${fixtureId}`);

  console.log(response.data.api);

  dispatch({
    type: FETCH_MATCH,
    payload: response.data.api.fixtures
  });
};

export const fetchMatchTeams = (homeTeamId, awayTeamId) => async (dispatch, getState) => {
  await dispatch(fetchTeam(homeTeamId));
  await dispatch(fetchTeam(awayTeamId));
} // could just call each action from the component instead