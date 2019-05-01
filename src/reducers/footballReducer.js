import _ from 'lodash';
import set from 'lodash/fp/set';
import { FETCH_COMPETITIONS, FETCH_COMPETITION, FETCH_COUNTRIES, FETCH_STANDINGS, FETCH_TEAM, FETCH_COMPETITION_MATCHES, FOLLOW_COMPETITION, FOLLOW_TEAM, FETCH_MATCH, FETCH_TEAMS } from "../actions/types";
import { countryCodes } from '../data/countryCodes';


const INITIAL_STATE = { // possible default to root level?
  countries: {},
	competition: {},
	standings: {},
	team: {},
	teams: {},
	matches: {},
	match: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
		case FETCH_COUNTRIES:
			// console.log(action.payload)
			const countries = {}
			_.forOwn(action.payload, name => {
				const code = countryCodes[name];
				if (code !== undefined) countries[code] = { name, code }
			});
			return { ...state, countries };
		case FETCH_COMPETITIONS:
			const countryCode = Object.values(action.payload)[0].country_code;
			return set(`countries[${countryCode}].competitions`, action.payload, state); // mapkeys turns payload array into key-based obj
		case FETCH_COMPETITION:
			return {...state, competition: Object.values(action.payload)[0] }
		case FETCH_STANDINGS:
			return {...state, standings: Object.values(action.payload)[0] }
		case FETCH_COMPETITION_MATCHES:
			return { ...state, matches: action.payload }
		case FETCH_TEAM:
			return { ...state, team: Object.values(action.payload)[0] }
		case FETCH_TEAMS:
			return { ...state, teams: action.payload }
		case FETCH_MATCH:
			return { ...state, match: Object.values(action.payload)[0] }
		case FOLLOW_TEAM:
			return state;
		case FOLLOW_COMPETITION:
			return state;
    // case CREATE_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };
    // case EDIT_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };
    // case DELETE_STREAM:
    //   return _.omit(state, action.payload); // omit: creates new object and omits the id passed in
    default:
      return state;
  }
}