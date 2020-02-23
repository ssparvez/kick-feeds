import { CREATE_NOTE, DELETE_NOTE, FETCH_NOTES_REQUEST, FETCH_NOTES_SUCCESS, CREATE_TAG, FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, EDIT_NOTE, SIGN_OUT, FETCH_TAG, EDIT_TAG, DELETE_TAG } from "../actions/types";
import _ from 'lodash';
const INITIAL_STATE = { // possible default to root level?
  notes: {},
  tags: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTES_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_NOTES_SUCCESS:
      return { ...state, isFetching: false, notes: _.mapKeys(action.payload, '_id') };
    case CREATE_NOTE:
      return { ...state, notes: { ...state.notes, [action.payload._id]: action.payload } };
    case EDIT_NOTE:
      return { ...state, notes: { ...state.notes, [action.payload._id]: action.payload } };
    case DELETE_NOTE: // returns array copy and omits the object of the id passed in
      return { ...state, notes: _.omit(state.notes, action.payload) };
    case CREATE_TAG:
      return { ...state, tags: { ...state.tags, [action.payload._id]: action.payload } };
    case FETCH_TAGS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_TAGS_SUCCESS:
      return { ...state, isFetching: false, tags: _.mapKeys(action.payload, '_id') };
    case FETCH_TAG:
      return { ...state, tag: action.payload };
    case EDIT_TAG:
      return { ...state, tags: { ...state.tags, [action.payload._id]: action.payload } };
    case DELETE_TAG: // returns array copy and omits the object of the id passed in
      return { ...state, tags: _.omit(state.tags, action.payload) };
    case SIGN_OUT: // wipe out state
      return INITIAL_STATE;
    default:
      return state;
  }
}